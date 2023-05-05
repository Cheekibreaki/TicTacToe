
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

  // const [xIsNext, setxIsNext] = useState(true);
  
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;

  const moves = history.map((squares, move) => {
    let description;
    console.log(xIsNext)
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key = {move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
    
  });


  return(
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  )

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    // setxIsNext(nextMove % 2 === 0);
  }


  
  function handlePlay(nextSquares){
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setHistory([...history, nextSquares]);
    console.log(nextSquares);
    console.log(history);
    // setxIsNext(!xIsNext)
  }
}

function Board({xIsNext,squares,onPlay}) {
  // const [squares,setsauqreValue] = useState(Array(9).fill(null));
  // const [xIsNext,setxIsNext] = useState(true);


  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  function handleClick(i) {
      
      if(squares[i] || calculateWinner(squares)){
        return;
      }
      const nextSquares = squares.slice();
      if(xIsNext){
        nextSquares[i] = "X";
      }else{
        nextSquares[i] = "O";
      }
      // console.log("yes")
      
      onPlay(nextSquares);
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
