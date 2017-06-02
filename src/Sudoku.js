import React from 'react';
import PropTypes from 'prop-types';
import Square from './Square.js';

export default class Sudoku extends React.Component {
  render () {
    const board = this.props.board;
    const squares = [];
    for (const key in board) {
      if (key) {
        squares.push(
          <Square
            key={key}
            handleChange={this.props.handleChange.bind(this, key)}
            value={board[key]} />
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
    );
  }
}

Sudoku.propTypes = {
  board: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
};
