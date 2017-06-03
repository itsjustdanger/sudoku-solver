import React from 'react';
import Sudoku from './Sudoku.js';

const _cross = (a, b) => {
  const crossResult = [];

  a.forEach((aEl) => {
    b.forEach((bEl) => {
      crossResult.push(aEl + bEl)
    });
  });

  return crossResult;
}

const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
const cols = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
const BOXES = _cross(rows, cols);
const ROW_UNITS = [];
const COL_UNITS = [];
const SQUARE_UNITS = [];
const squareRowSets = [['A', 'B', 'C'], ['D', 'E', 'F'], ['G', 'H', 'I']];
const squareColSets = [['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9']];
const UNITS = {};
const PEERS = {};

// Create row units array
rows.forEach((row) => {
  ROW_UNITS.push(_cross([row], cols));
});

// Create col units array
cols.forEach((col) => {
  COL_UNITS.push(_cross(rows, [col]));
});

// Create square units array
squareRowSets.forEach((rowSet) => {
  squareColSets.forEach((colSet) => {
    SQUARE_UNITS.push(_cross(rowSet, colSet));
  });
});

// Create array of all units combined
const ALL_UNITS = ROW_UNITS.concat(COL_UNITS).concat(SQUARE_UNITS);

BOXES.forEach((box) => {
  UNITS[box] = [];
  PEERS[box] = [];

  // Populate the units object with keys for each box and values for each
  // of a box's associated units.
  ALL_UNITS.forEach((unit) => {
    if (unit.includes(box)) {
      UNITS[box].push(unit);
    }
  });

  // Populate the peers object with keys for each box and values for all
  // a box's unique peers
  UNITS[box].forEach((unit) => {
    unit.forEach((peer) => {
      if (!PEERS[box].includes(peer) && peer !== box) {
        PEERS[box].push(peer);
      }
    });
  });
});



export default class SudokuContainer extends React.Component {
  constructor() {
    super();
    this.setState = this.setState.bind(this);

    const board = {};

    BOXES.forEach((box) => {
      board[box] = '';
    });

    this.state = {board, unsolvable: false};
  }


  /**
   * handleChange - takes the location and input event and sets the square
   * at the location equal to the value of the input.
   *
   * @param  {string} loc board representation location of the square
   * @param  {object} e   the input event
   * @return {void}
   */
  handleChange(loc, e) {
    const value = e.target.value;
    if (value && (value < 1 || value > 9)) return;

    const board = this.state.board;

    board[loc] = e.target.value;

    this.setState({board});
  }


  /**
   * solve - starting point for the solve functionality. Searches the board
   * for solutions and if found, sets the display board's state to the
   * solution and returns true. Otherwise, change 'unsolvable' state to false
   * and display the 'unsolvable' notification.
   *
   * @return {boolean}  whether the board is solvable
   */
  solve() {
    const solution = this.search(this._createSolutionBoard());

    if (solution) {
      this.setState({board: solution});

      return true;
    }
    this.setState({unsolvable: true})
    return false;
  }


  /**
   * clear - clears the current board values
   *
   * @return {void}
   */
  clear() {
    const board = this.state.board;

    for (const box in board) {
      board[box] = '';
    }

    this.setState({board, unsolvable: false});
  }


  /**
   * eliminate - Iterates through the board of completed values and
   * removes solved values from peers.
   *
   * @return {void}
   */
  eliminate(board) {
    const solvedBoxes = this._getSolvedBoxes(board);

    solvedBoxes.forEach((box) => {
      const value = board[box];

      PEERS[box].forEach((peer) => {
        board[peer] = board[peer].replace(value, '');
      });
    });

    return board;
  }


  /**
   * onlyChoice - Iterates through the solution board and finds boxes with
   * only one possible value, that value is then entered into the display
   * board.
   *
   * @return {void}
   */
  onlyChoice(board) {
    const digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

    ALL_UNITS.forEach((unit) => {
      digits.forEach((digit) => {
        const choices = [];

        unit.forEach((box) => {
          if (board[box].includes(digit)) {
            choices.push(box)
          }
        });

        if (choices.length === 1) {
          board[choices[0]] = digit;
        }
      });
    });

    return board;
  }

  // nakedTwins() {
  //   ALL_UNITS.forEach((unit) => {
  //     const twinBoxes = [];
  //     const twinValues = [];
  //     const twins = [];
  //   });
  // }


  /**
   * reduce - A more or less literal reduce function in this context,
   *  combining all elmination strategies and checking board validity.
   *
   * @param  {object} board the current board to process
   * @return {object|boolean}       either the processed board or false if invalid
   */
  reduce(board) {
    let stalled = false;

    while (!stalled) {
      // Check how many squares are solved before elimination functions
      const solvedBefore = this._getSolvedBoxes(board).length;

      // Run the elimination functions
      this.eliminate(board);
      this.onlyChoice(board);

      // Check how many squares are solved after elimination functions
      const solvedAfter = this._getSolvedBoxes(board).length;

      // See if the reduction was any change to the board
      stalled = solvedBefore === solvedAfter;

      // Check if the board is invalid and return false if it is
      if (this._boardInvalid(board)) {
        return false;
      }
    }

    return board;
  }


  /**
   * search - run through the search process by reducing the board,
   * checking for invalid boards, checking for solved boards, and then
   * constructing and traversing the solution state search tree as
   * necessary. Returns a solved board or void.
   *
   * @param  {object} board the board to search
   * @return {object|void}       solved board or void
   */
  search(board) {
    // Reduce elimination functions on the board
    const reducedBoard = this.reduce(board);

    // Check for inavlid board
    if (reducedBoard === false) {
      return false;
    }

    // Check for solved board
    if (this._checkSolved(reducedBoard)) {
      return reducedBoard;
    }

    /*
     * Iterate through all the boxes and find an unsolved square (guessBox)
     *  with the fewest possibilities. This speeds up the efficiency of our
     * search a bit by limiting branching near the root; we would hit a lot of
     * invalid solutions first if we didn't do this.
     */
    let guessBox;

    BOXES.forEach((box) => {
      if (reducedBoard[box].length > 1 && (!guessBox || (guessBox && reducedBoard[box].length < reducedBoard[guessBox].length))) {
        guessBox = box;
      }
    });

    /*
     * Iterate through the possible values of the chosen square and try them,
     * creating a copy of the board for each value and recursively search
     * through them. If a completed board is found, return it, otherwise
     * discard and move on.
     */
    const options = reducedBoard[guessBox];

    for (let option = 0; option < guessBox.length; option++) {
      const newBoard = Object.assign({}, reducedBoard);
      newBoard[guessBox] = options[option];
      const attempt = this.search(newBoard);

      if (attempt) return attempt;
    }
  }


  /**
   * _checkSolved - helper function to check whether the board is solved. This
   * is mainly for syntactic sugar. We already have a _getSolvedBoxes
   * functions, and we could simply test the length, but I wanted something
   * that simply returns a boolean and didn't feel the need to waste memory if
   * we weren't using the returned solvedBoxes array.
   *
   * @param  {object} board the board to check
   * @return {boolean}       whether the board is solved
   */
  _checkSolved(board) {
    let solved = true;

    BOXES.forEach((box) => {
      if (board[box].length !== 1) {
        solved = false;
      }
    });

    return solved;
  }


  /**
   * _getSolvedBoxes - internal method to return the coords of all
   * boxes that have solved values.
   *
   * @return {array}  all solved boxes on the board
   */
  _getSolvedBoxes(board) {
    const solvedBoxes = [];

    BOXES.forEach((box) => {
      if (board[box].length === 1) {
        solvedBoxes.push(box);
      }
    });

    return solvedBoxes;
  }


  /**
   * _boardInvalid - internal method to return whether the given board
   * is invalid.
   *
   * @param  {object} board the board to check
   * @return {object}       whether th board is invalid
   */
  _boardInvalid(board) {
    for (const box in board) {
      if (!board[box]) {
        return true;
      }
    }

    return false;
  }


  /**
   * _createSolutionBoard - turns the display board state of inputs into a
   * 'solution board' with values equal to the remaining available choices.
   * So, for an empty square, the value gets initialized as '123456789'. For a
   * solved/input square, the value gets initialized as that value (i.e. '1').
   *
   * @return {object} the initial constructed solution board.
   */
  _createSolutionBoard() {
    const board = Object.assign({}, this.state.board);

    for (const key in board) {
      if (!board[key]) {
        board[key] = '123456789';
      }
    }

    return board;
  }

  render() {
    return (
      <Sudoku
        board={this.state.board}
        clear={this.clear.bind(this)}
        handleChange={this.handleChange.bind(this)}
        solve={this.solve.bind(this)}
        unsolvable={this.state.unsolvable} />
    );
  }
}
