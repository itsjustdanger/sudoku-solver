import React from 'react';
import PropTypes from 'prop-types';

export default class Square extends React.Component {
  render() {
    return (
      <input className="square" type="text" value={this.props.value} />
    );
  }
}

Square.propTypes = {
  value: PropTypes.String,
};
