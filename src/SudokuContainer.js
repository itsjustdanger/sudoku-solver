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

// Create a js object where the key is a boxes' location
// and the value is an array of the units in which is box is contained.
// Populate the peers object with keys for each box and values for all
// a boxes' unique peers
BOXES.forEach((box) => {
  UNITS[box] = [];
  PEERS[box] = [];

  ALL_UNITS.forEach((unit) => {
    if (unit.includes(box)) {
      UNITS[box].push(unit);
    }
  });

  UNITS[box].forEach((unit) => {
    unit.forEach((peer) => {
      if (!PEERS[box].includes(peer)) {
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
    const solution = {};

    BOXES.forEach((box) => {
      board[box] = '';
      solution[box] = '';
    });

    this.state = {board, solution, solving: false, };
  }

  handleChange (loc, e) {
    const value = e.target.value;
    if (value && (value < 1 || value > 9)) return;

    const board = this.state.board;
    const solution = this.state.solution;

    board[loc] = e.target.value;
    solution[loc] = e.target.value;

    this.setState({board, solution,});
  }

  render() {
    return (
      <Sudoku
        board={this.state.board}
        handleChange={this.handleChange.bind(this)} />
    );
  }
}
