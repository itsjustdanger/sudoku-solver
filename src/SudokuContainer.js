import React from 'react';
import Sudoku from './Sudoku.js';

const BOARD_HEIGHT = 9;
const BOARD_LENGTH = 9;

export default class SudokuContainer extends React.Component {
  constructor() {
    super();
    this.setState = this.setState.bind(this);

    const board = [];

    for (let row = 0; row < BOARD_LENGTH; row++) {
      const columns = [];

      for (let col = 0; col < BOARD_HEIGHT; col++) {
        const square = {
          loc: `${row}${col}`,
          value: '',
        };

        columns.push(square);
      }
      board.push(columns);
    }

    this.state = {board,};
  }

  handleChange (loc, e) {
    const value = e.target.value;
    if (value && (value < 1 || value > 9)) return;

    const board = this.state.board;
    board[loc[0]][loc[1]].value = e.target.value;

    this.setState(board);
  }

  render() {
    return (
      <Sudoku
        board={this.state.board}
        handleChange={this.handleChange.bind(this)} />
    );
  }
}
