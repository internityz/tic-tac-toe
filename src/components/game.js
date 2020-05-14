import React, { Component } from "react";
import Board from "./board";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: {
        locations: Array(9).fill(null),
        squareHist: [
          {
            squares: Array(9).fill(null),
          },
        ],
      },
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick = (i, { row, col }) => {
    const squareHistory = this.state.history.squareHist.slice(
      0,
      this.state.stepNumber + 1
    );
    const current = squareHistory[squareHistory.length - 1];
    const squares = current.squares.slice(); //create a copy of the squares to modify
    const locations = this.state.history.locations.slice(
      0,
      this.state.stepNumber + 1
    );
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: {
        locations: locations.concat([{ row, col }]),
        squareHist: squareHistory.concat([
          {
            squares: squares,
          },
        ]),
      },
      stepNumber: squareHistory.length,
      xIsNext: !this.state.xIsNext,
    });
  };

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  render() {
    const squareHist = this.state.history.squareHist;
    const current = squareHist[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const moves = squareHist.map((step, move) => {
      console.log(this.state.history.locations[move]);
      const desc = move
        ? "Go to move #" +
          move +
          " " +
          JSON.stringify(this.state.history.locations[move], (key, value) => {
            return value;
          })
        : "Go to game start";
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }
    return (
      <React.Fragment>
        <div className="game">
          <div className="game-board">
            <Board onClick={this.handleClick} squares={current.squares} />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Game;
