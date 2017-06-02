import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SudokuContainer from './SudokuContainer.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <SudokuContainer />
      </div>
    );
  }
}

export default App;
