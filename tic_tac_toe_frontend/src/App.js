import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import Board from './components/Board';
import Scoreboard from './components/Scoreboard';
import Controls from './components/Controls';
import { calculateWinner, getInitialGameState, isBoardFull, nextPlayer, storageKeys } from './utils/game';

// PUBLIC_INTERFACE
function App() {
  /**
   * App is the main game container for Tic Tac Toe.
   * It manages the board state, turn, scores, persistence (localStorage),
   * accessibility live status, and integrates the Board, Scoreboard, and Controls.
   */
  const [squares, setSquares] = useState(() => {
    const saved = localStorage.getItem(storageKeys.squares);
    return saved ? JSON.parse(saved) : Array(9).fill(null);
  });
  const [xIsNext, setXIsNext] = useState(() => {
    const saved = localStorage.getItem(storageKeys.xIsNext);
    return saved ? JSON.parse(saved) : true;
  });
  const [scores, setScores] = useState(() => {
    const saved = localStorage.getItem(storageKeys.scores);
    return saved ? JSON.parse(saved) : { X: 0, O: 0, draws: 0 };
  });

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem(storageKeys.squares, JSON.stringify(squares));
  }, [squares]);
  useEffect(() => {
    localStorage.setItem(storageKeys.xIsNext, JSON.stringify(xIsNext));
  }, [xIsNext]);
  useEffect(() => {
    localStorage.setItem(storageKeys.scores, JSON.stringify(scores));
  }, [scores]);

  // Compute winner and winning line
  const result = useMemo(() => calculateWinner(squares), [squares]);
  const winner = result?.winner ?? null;
  const winningLine = result?.line ?? null;

  // Update scores when a game finishes (once)
  useEffect(() => {
    if (winner || (isBoardFull(squares) && !winner)) {
      setScores(prev => {
        // Avoid double increment if effect re-runs for the same board
        const key = JSON.stringify({ squares, winner });
        const lastKey = sessionStorage.getItem('lastResultKey');
        if (lastKey === key) return prev;
        sessionStorage.setItem('lastResultKey', key);

        if (winner === 'X') return { ...prev, X: prev.X + 1 };
        if (winner === 'O') return { ...prev, O: prev.O + 1 };
        return { ...prev, draws: prev.draws + 1 };
      });
    }
  }, [winner, squares]);

  const statusText = useMemo(() => {
    if (winner) return `Winner: ${winner}`;
    if (!winner && isBoardFull(squares)) return 'Draw!';
    return `Next player: ${xIsNext ? 'X' : 'O'}`;
  }, [winner, squares, xIsNext]);

  // PUBLIC_INTERFACE
  const handleSquareClick = (index) => {
    /** Handles a player's move if the game is not finished and square is empty. */
    if (winner || squares[index]) return;
    const next = squares.slice();
    next[index] = xIsNext ? 'X' : 'O';
    setSquares(next);
    setXIsNext(prev => !prev);
  };

  // PUBLIC_INTERFACE
  const newGame = () => {
    /** Clears only the board and keeps scores. Alternates starting player. */
    const init = getInitialGameState();
    setSquares(Array(9).fill(null));
    setXIsNext(init.xStarts === 'X');
    // Reset last result key to avoid blocking next scoring
    sessionStorage.removeItem('lastResultKey');
  };

  // PUBLIC_INTERFACE
  const resetMatch = () => {
    /** Resets board and scores. X starts again. */
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setScores({ X: 0, O: 0, draws: 0 });
    sessionStorage.removeItem('lastResultKey');
  };

  // PUBLIC_INTERFACE
  const undo = () => {
    /** Undo the last move. */
    if (winner) return; // simplicity: don't undo after game ends
    const lastIndex = [...squares].reverse().findIndex(Boolean);
    if (lastIndex === -1) return;
    const indexToClear = 8 - lastIndex;
    const copy = squares.slice();
    copy[indexToClear] = null;
    setSquares(copy);
    setXIsNext(prev => !prev);
  };

  return (
    <div className="App">
      <main className="container">
        <div className="header">
          <div>
            <h1 className="title" aria-label="Game title">Throne Tic Tac Toe</h1>
            <p className="subtitle">Claim the board with House X or House O</p>
          </div>
          <div aria-live="polite" aria-atomic="true" className="status" data-testid="status">
            {winner ? <span className="win">Winner: {winner}</span> :
              isBoardFull(squares) ? <span className="draw">Draw!</span> :
                <span>Next: <span className={xIsNext ? 'x' : 'o'}>{xIsNext ? 'X' : 'O'}</span></span>}
          </div>
        </div>

        <div className="layout">
          <section className="card" aria-labelledby="scoreboard-heading">
            <h2 id="scoreboard-heading" className="sr-only" style={{position:'absolute',left:'-9999px'}}>Scoreboard</h2>
            <Scoreboard scores={scores} />
            <div className="footer-note">Scores persist locally</div>
          </section>

          <section className="card" aria-labelledby="board-heading">
            <h2 id="board-heading" className="sr-only" style={{position:'absolute',left:'-9999px'}}>Game board</h2>
            <Board
              squares={squares}
              onSquareClick={handleSquareClick}
              winningLine={winningLine}
              next={xIsNext ? 'X' : 'O'}
            />
            <div className="controls" style={{ marginTop: 16 }}>
              <Controls
                onNewGame={newGame}
                onResetMatch={resetMatch}
                onUndo={undo}
                disabledUndo={!squares.some(Boolean) || winner}
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
