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
    status: string;
    squares: string[];
  }
  const [state, setState] = React.useState<BoardState>({
    status: "Next player: X",
    squares: Array(9).fill(null),
  });
  const handleClick = (i: number) => {
    const squares = state.squares.slice();
    squares[i] = "X";
    setState({ ...state, squares });
  };
  const renderSquare = (i: number) => (
    <Square value={state.squares[i]} onClick={() => handleClick(i)} />
  );

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
