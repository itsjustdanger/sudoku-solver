import React from 'react';
import Sudoku from './Sudoku.js';

const BOARD_HEIGHT = 9;
const BOARD_LENGTH = 9;

export default class SudokuContainer extends React.Component {
  constructor() {
    super();

    const board = [];

    for (let row = 0; row < BOARD_LENGTH; row++) {
      const columns = [];

      for (let col = 0; col < BOARD_HEIGHT; col++) {
        columns.push('.');
      }

      board.push(columns);
    }

    this.state = {board,};
  }

  render() {
    return (
      <Sudoku board={this.state.board} />
    );
  }
}
