import React from 'react';
import PropTypes from 'prop-types';
import Square from './Square.js';

/* Display component for the sudoku board */
export default class SudokuBoard extends React.Component {
  render() {
    const board = this.props.board;
    const squares = [];

    for (const box in board) {
      if (box) {
        squares.push(
          <Square
            key={box}
            handleChange={this.props.handleChange.bind(this, box)}
            value={board[box]} />
        );
      }
    }

    return (
      <div className="sudoku-board">
        <span className="cross-line top"></span>
        <span className="cross-line bottom"></span>
        <span className="cross-line left"></span>
        <span className="cross-line right"></span>
        {squares}
      </div>
    )
  }
}

SudokuBoard.propTypes = {
  board: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
}
