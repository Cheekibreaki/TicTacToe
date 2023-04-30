import React, {useState} from 'react';
function Square({squarevalue, onsquareClick}) {

  return (<button className="square" onClick={onsquareClick}>{squarevalue}</button>);

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
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default function Game() {

  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const currentSquares = history[history.length - 1];

  return(
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
      <div className="game-info">
        <ol>{/*TODO*/}</ol>
      </div>
    </div>
  )
}

function Board() {
  const [squares,setsauqreValue] = useState(Array(9).fill(null));
  const [xIsNext,setxIsNext] = useState(true);


  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  function handleClick(i) {
      const nextSquares = squares.slice();
      if(squares[i] || calculateWinner(squares)){
        return;
      }
      if(xIsNext){
        nextSquares[i] = "X";
      }else{
        nextSquares[i] = "O";
      }
      console.log("yes")
      setsauqreValue(nextSquares);
      setxIsNext(!xIsNext)
  }

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square squarevalue={squares[0]}  onsquareClick={() => handleClick(0)}/>
        <Square squarevalue={squares[1]}  onsquareClick={() => handleClick(1)}/>
        <Square squarevalue={squares[2]}   onsquareClick={() => handleClick(2)}/>
      </div>
      <div className="board-row">
        <Square squarevalue={squares[3]}   onsquareClick={() => handleClick(3)}/>
        <Square squarevalue={squares[4]}   onsquareClick={() => handleClick(4)}/>
        <Square squarevalue={squares[5]}   onsquareClick={() => handleClick(5)}/>
      </div>
      <div className="board-row">
        <Square squarevalue={squares[6]}   onsquareClick={() => handleClick(6)}/>
        <Square squarevalue={squares[7]}   onsquareClick={() => handleClick(7)}/>
        <Square squarevalue={squares[8]}    onsquareClick={() => handleClick(8)}/>
      </div>
    </div>
  );
}
