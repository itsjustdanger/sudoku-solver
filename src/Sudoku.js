import React from 'react';
import Square from './Square.js';

export default class Sudoku extends React.Component {
  render () {
    const board = this.props.board;
    const subSquares = [];
    for (let squareRow = 0; squareRow < board.length / 3; squareRow++) {
      for (let squareCol = 0; squareCol < board[0].length / 3; squareCol++) {

        const square = [];
        const subRowStart = squareRow * 3;
        const subRowEnd = subRowStart + 3

        for (let subRow = subRowStart; subRow < subRowEnd; subRow++) {
          const subColStart = squareCol * 3;
          const subColEnd = subColStart + 3;

          for (let subCol = subColStart; subCol < subColEnd; subCol++) {
            square.push(board[subRow][subCol]);
            console.log(subRow + subCol)
          }
        }

        subSquares.push(square);
      }
    }

    return (
      <div className="sudoku-board">
        {subSquares.map((subSquare) => {
          return (
            <div className="sub-square">
              {
                subSquare.map((square) => {
                  return (
                    <Square value={square} />
                  );
                })
              }
            </div>
          );
        })

        }
      </div>
    );
  }
}
