import React from "react";
import "./App.css";

const Square = ({
  value,
  onClick,
}: {
  value: number | string;
  onClick: () => void;
}) => {
  return (
    <button onClick={onClick} className="square">
      {value}
    </button>
  );
};

const Board = () => {
  interface BoardState {
    status: string | null;
    winner: string | null;
    squares: string[];
    xIsNext: boolean;
  }
  const xIsNext = true;
  const squares = Array(9).fill(null);
  const nextPlayer = (xIsNext: boolean): string => (xIsNext ? "X" : "O");
  const calculateWinner = (squares: string[]): string | null => {
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
    const completed = lines.filter(
      ([a, b, c]) =>
        squares[a] && squares[a] === squares[b] && squares[a] === squares[c]
    );

    return completed.length > 0 ? squares[completed[0][0]] : null;
  };
  const getStatus = (squares: string[], xIsNext: boolean): string => {
    const winner = calculateWinner(squares);

    return winner ? `Winner: ${winner}` : `Next player: ${nextPlayer(xIsNext)}`;
  };
  const [state, setState] = React.useState<BoardState>({
    status: getStatus(squares, xIsNext),
    winner: null,
    squares,
    xIsNext,
  });

  const handleClick = (i: number) => {
    if (state.winner || state.squares[i]) {
      return;
    }

    const squares = state.squares.slice();
    squares[i] = nextPlayer(state.xIsNext);

    // RAV: setState merges the object you provide into the current state
    setState((state) => ({
      squares,
      xIsNext: !state.xIsNext,
      winner: calculateWinner(squares),
      status: getStatus(squares, state.xIsNext),
    }));
  };

  const renderSquare = (i: number) => (
    <Square value={state.squares[i]} onClick={() => handleClick(i)} />
  );

  // RAV: setState can't be used for initialization, only in effects
  // because it triggers RERENDERING of component !!!

  return (
    <div>
      <div className="status">{state.status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

const Game = () => (
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

// ========================================

function App() {
  return <Game />;
}

export default App;
