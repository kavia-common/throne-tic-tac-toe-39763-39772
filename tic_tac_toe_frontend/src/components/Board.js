import React from 'react';
import Square from './Square';

/**
 * The 3x3 tic tac toe board. Delegates click handling to parent.
 * Highlights squares that are part of a winning line.
 */
// PUBLIC_INTERFACE
export default function Board({ squares, onSquareClick, winningLine = [], next }) {
  return (
    <div className="board" role="grid" aria-label="Tic Tac Toe board" aria-describedby="board-desc">
      <p id="board-desc" className="sr-only" style={{position:'absolute',left:'-9999px'}}>
        Use arrow keys to navigate and Enter or Space to place a mark. Next player is {next}.
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
