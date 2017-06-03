import React from 'react';
import PropTypes from 'prop-types';
import SudokuBoard from './SudokuBoard.js';

/* Display component for sudoku board and control components */
export default class Sudoku extends React.Component {
  render () {

    return (
      <div className="sudoku">
        <h1>sudoku solver</h1>
        <p>enter initial values and press 'solve'</p>

        <SudokuBoard
          board={this.props.board}
          handleChange={this.props.handleChange}/>

        <button className="clear-button" onClick={this.props.clear}>
          clear
        </button>
        <button className="solve-button" onClick={this.props.solve}>
          solve
        </button>

        {this.props.unsolvable &&
          <p className="unsolvable">whoops, this board is unsolvable!</p>
        }
      </div>
    );
  }
}

Sudoku.propTypes = {
  board: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  solve: PropTypes.func.isRequired,
  unsolvable: PropTypes.bool.isRequired,
};
