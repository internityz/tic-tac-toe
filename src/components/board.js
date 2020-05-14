import React, { Component } from "react";
import Square from "./square";

class Board extends Component {
  renderSquare(i, { row, col }) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i, { row, col })}
      />
    );
  }
  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0, { row: 0, col: 0 })}
          {this.renderSquare(1, { row: 0, col: 1 })}
          {this.renderSquare(2, { row: 0, col: 2 })}
        </div>
        <div className="board-row">
          {this.renderSquare(3, { row: 1, col: 0 })}
          {this.renderSquare(4, { row: 1, col: 1 })}
          {this.renderSquare(5, { row: 1, col: 2 })}
        </div>
        <div className="board-row">
          {this.renderSquare(6, { row: 2, col: 0 })}
          {this.renderSquare(7, { row: 2, col: 1 })}
          {this.renderSquare(8, { row: 2, col: 2 })}
        </div>
      </div>
    );
  }
}

export default Board;
