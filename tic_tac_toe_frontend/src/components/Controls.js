import React from 'react';

/**
 * Action buttons for controlling the game lifecycle.
 */
// PUBLIC_INTERFACE
export default function Controls({ onNewGame, onResetMatch, onUndo, disabledUndo }) {
  return (
    <>
      <button className="btn btn-primary" onClick={onNewGame} aria-label="Start a new game" data-testid="new-game">
        New Game
      </button>
      <button className="btn" onClick={onUndo} aria-label="Undo last move" disabled={disabledUndo} data-testid="undo">
        Undo
      </button>
      <button className="btn btn-warning" onClick={onResetMatch} aria-label="Reset scores and board" data-testid="reset-match">
        Reset Match
      </button>
    </>
  );
}
