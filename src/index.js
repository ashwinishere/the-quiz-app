import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

const Square = (props) =>  {
    return (
      <button onClick={() => props.onClick()} className="square">
        {props.value}
      </button>
    );
}

class Board extends React.Component {

  handleClick(i) {
const squares = this.state.squares.slice();
if (calculateWinner(squares) || squares[i]) {
  return;
}
squares[i] = this.state.isXnext ? 'X' : 'O';
this.setState({squares,isXnext: !this.state.isXnext});
  }
  renderSquare(i) {
    return <Square onClick={() => this.handleClick(i)} value={this.state.squares[i]} />;
  }

  render() {
    const isWinner = calculateWinner(this.state.squares);
    let status;
    if (isWinner) {
     status =  `Winner is ${isWinner}`; 
    } else {
      
    status = `Next player: ${this.state.isXnext ? 'X': 'O'}`;
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: new Array(9).fill(null),
      isXnext: true
    }
  }
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
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
// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
