import React from 'react';
import PropTypes from 'prop-types';

/* Display component for a single sudoku square */
export default class Square extends React.Component {
  render() {
    return (
      <input
        className="square"
        maxLength={1}
        onChange={this.props.handleChange}
        type="number"
        value={this.props.value} />
    );
  }
}

Square.propTypes = {
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
