import React from 'react';
import Sudoku from './Sudoku.js';

const BOARD_HEIGHT = 9;
const BOARD_LENGTH = 9;

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

    this.state = {board};
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

  reduce(board) {
    let stalled = false;

    while (!stalled) {
      const solvedBefore = this._getSolvedBoxes(board).length;

      this.eliminate(board);
      this.onlyChoice(board);

      const solvedAfter = this._getSolvedBoxes(board).length;

      stalled = solvedBefore === solvedAfter;
      console.log(solvedAfter);
      console.log('checking for invalid board...');

      if (this._boardInvalid(board)) {
        return false;
      }
    }

    return board;
  }


  search(board) {
    console.log('Using elimination strategies...');

    const reducedBoard = this.reduce(board);
    console.log(reducedBoard);
    if (reducedBoard === false) {
      console.log('Invalid board recognized!');
      return false;
    }

    console.log('Checking for solved board...');

    if (this._checkSolved(reducedBoard)) {
      console.log('Solution Found!');
      return reducedBoard;
    }

    let guessBox = '';

    console.log('Building search tree...');
    // Iterate through all the boxes and find an unfilled square with
    // the fewest possibilities
    BOXES.forEach((box) => {
      console.log(guessBox);
      if (reducedBoard[box].length > 1 && (!guessBox || (guessBox && reducedBoard[box].length < reducedBoard[guessBox].length))) {
        guessBox = box;
      }
    });

    console.log('Searching tree...');
    const options = reducedBoard[guessBox];

    for (let option = 0; option < guessBox.length; option++) {
      const newBoard = Object.assign({}, reducedBoard);
      newBoard[guessBox] = options[option];
      const attempt = this.search(newBoard);

      if (attempt) return attempt;
    }

    console.log('SHOULD NOT GET HERE!!');
  }


  solve() {
    console.log('Starting Solve');
    const solution = this.search(this._createSolutionBoard());

    if (solution) {
      this.setState({board: solution});

      return true;
    }

    console.error('Solve Failed!');
    console.log(solution);
  }

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


  _createSolutionBoard() {
    const board = Object.assign({}, this.state.board);

    for (const key in board) {
      if (!board[key]) {
        board[key] = '123456789';
      }
    }

    console.log('Solution Board Created!');
    console.log(board);
    return board;
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
    const solution = this.state.solution;

    board[loc] = e.target.value;

    this.setState({board});
  }

  render() {
    return (
      <Sudoku
        board={this.state.board}
        handleChange={this.handleChange.bind(this)}
        solve={this.solve.bind(this)} />
    );
  }
}
