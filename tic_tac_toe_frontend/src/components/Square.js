import React, { useCallback } from 'react';
import gotX from '../assets/got-x.svg';
import gotO from '../assets/got-o.svg';

/**
 * A single square cell on the board. Supports mouse and keyboard interaction.
 * Renders GOT-styled icons for X and O.
 */
// PUBLIC_INTERFACE
export default function Square({ value, onClick, index, isWinning }) {
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.();
    }
  }, [onClick]);

  const label = value ? `Square ${index + 1}, ${value}` : `Square ${index + 1}, empty`;

  return (
    <button
      type="button"
      className={`square${isWinning ? ' winning' : ''}`}
      aria-label={label}
      aria-pressed={!!value}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      data-testid={`square-${index}`}
    >
      {value === 'X' && <img src={gotX} alt="House X" />}
      {value === 'O' && <img src={gotO} alt="House O" />}
      {!value && <span className="sr-only" style={{position:'absolute',left:'-9999px'}}>Empty</span>}
    </button>
  );
}
