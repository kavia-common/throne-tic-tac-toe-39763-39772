import React from 'react';
import Square from './Square';

/**
 * The 3x3 tic tac toe board. Delegates click handling to parent.
 * Highlights squares that are part of a winning line. Uses aria-describedby to
 * communicate keyboard usage and current next player to assistive tech users.
 */
// PUBLIC_INTERFACE
export default function Board({ squares, onSquareClick, winningLine = [], next }) {
  return (
    <div className="board" role="grid" aria-label="Tic Tac Toe board" aria-describedby="board-desc">
      <p id="board-desc" className="sr-only" style={{position:'absolute',left:'-9999px'}}>
        Use Tab to focus a square, then press Enter or Space to place a mark. Next player is {next}.
      </p>
      {squares.map((val, idx) => (
        <Square
          key={idx}
          value={val}
          index={idx}
          isWinning={winningLine?.includes(idx)}
          onClick={() => onSquareClick(idx)}
        />
      ))}
    </div>
  );
}
