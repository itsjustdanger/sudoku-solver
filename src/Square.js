import React from 'react';
import PropTypes from 'prop-types';

export default class Square extends React.Component {
  render() {
    return (
      <input
        className="square"
        maxLength={1}
        onChange={this.props.handleChange}
        type="text"
        value={this.props.value} />
    );
  }
}

Square.propTypes = {
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
