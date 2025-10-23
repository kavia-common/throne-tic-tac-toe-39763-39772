import React from 'react';

/**
 * Displays the current scores for X, O and draws.
 */
// PUBLIC_INTERFACE
export default function Scoreboard({ scores }) {
  return (
    <div className="scoreboard" data-testid="scoreboard">
      <div className="score" aria-label="Score for X">
        <h3>House X</h3>
        <strong data-testid="score-x">{scores?.X ?? 0}</strong>
      </div>
      <div className="score" aria-label="Score for O">
        <h3>House O</h3>
        <strong data-testid="score-o">{scores?.O ?? 0}</strong>
      </div>
      <div className="score" aria-label="Draws">
        <h3>Draws</h3>
        <strong data-testid="score-draws">{scores?.draws ?? 0}</strong>
      </div>
    </div>
  );
}
