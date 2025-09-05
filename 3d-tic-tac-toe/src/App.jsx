import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Board from "./components/Board";
import Control from "./components/Control";
import "./index.css";
import { useWinner } from "./hooks/useWinner";

const defaultBoard = [
  [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ],
  [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ],
  [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ],
];

function App() {
  const [board, setBoard] = useState(defaultBoard);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const winner = useWinner(board);
  // Pick a random empty cell on the board
  function getRandomMove(board) {
    const emptyCells = [];
    board.forEach((layer, l) =>
      layer.forEach((row, r) =>
        row.forEach((cell, c) => {
          if (cell === "") emptyCells.push([l, r, c]);
        })
      )
    );
    if (emptyCells.length === 0) return null;
    return emptyCells[Math.floor(Math.random() * emptyCells.length)];
  }

  function handleResetClick() {
    setBoard(defaultBoard);
    setCurrentPlayer("X");
  }

  function handleMove(layer, row, col) {
    const newBoard = board.map((layerArr) =>
      layerArr.map((rowArr) => [...rowArr])
    );

    try {
      if (newBoard[layer][row][col] === "") {
        newBoard[layer][row][col] = "X";
        setBoard(newBoard);
        // const playerWinner = useWinner(newBoard);
        if (winner) {
          setCurrentPlayer(null);
          return;
        }

        // AI's turn
      } else {
        alert("Spot already taken. Try again!");
      }
    } catch {
      alert("Invalid Input");
    }
    const aiMove = getRandomMove(newBoard);
    if (aiMove) {
      const [l, r, c] = aiMove;
      newBoard[l][r][c] = "O";
      setBoard(newBoard);

      // const aiWinner = useWinner(newBoard);
      // if (aiWinner) setCurrentPlayer(null);
    }
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        {/* Main Game + Board */}
        <div className="col-lg-8">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-body text-center">
              <h1 className="display-5 fw-bold mb-4 text-primary">
                3D Tic Tac Toe
              </h1>

              {!winner ? (
                <h2 className="mb-4 text-secondary">
                  It’s{" "}
                  <span
                    className={
                      currentPlayer === "X" ? "text-success" : "text-danger"
                    }
                  >
                    {currentPlayer}
                  </span>
                  ’s turn
                </h2>
              ) : (
                <h2 className="mb-4 text-warning">
                  {winner === "Draw" ? "🤝 It's a draw!" : `🏆 ${winner} wins!`}
                </h2>
              )}

              {winner && (
                <button
                  className="btn btn-lg btn-outline-primary mb-4"
                  onClick={handleResetClick}
                >
                  🔄 Reset Game
                </button>
              )}

              <Control handleMove={handleMove} />
              <center>
                <div className="mt-4">
                  <Board board={board} />
                </div>
              </center>
            </div>
          </div>
        </div>

        {/* Side Panel with Notes */}
        <div className="col-lg-4">
          <div className="card shadow-sm border-0 rounded-4 bg-light">
            <div className="card-body">
              <h5 className="fw-bold mb-3">💡 How the Board Works</h5>
              <p>
                The board is a 3D array structured as{" "}
                <code>[layer][row][cell]</code>.
              </p>
              <p>
                Enter your move using <code>[][][]</code> syntax like you would
                in JavaScript. Incorrect input or attempting to fill a slot that
                has already been taken will result in lost turns
              </p>
              <p>
                After your move, AI will respond automatically. Disclaimer: The
                AI is really dumb.
              </p>
              <ul>
                <li>
                  <strong>Layers:</strong> The outermost arrays (0,1,2)
                </li>
                <li>
                  <strong>Rows:</strong> Each layer contains 3 row arrays
                </li>
                <li>
                  <strong>Cells:</strong> Each row contains 3 cells, which can
                  be "X", "O", or ""
                </li>
              </ul>
              <p>
                This is the array structure I used for the board. Using this
                structure, choose your moves:
              </p>
              <pre className="bg-dark text-light p-3 rounded">
                {`[
  [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ],
  [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ],
  [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ]
]`}
              </pre>
              <p className="text-muted small">
                You can use the array indices to target specific cells for
                moves.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
