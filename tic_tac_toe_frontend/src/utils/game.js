export const storageKeys = {
  squares: 'ttt_squares',
  xIsNext: 'ttt_xIsNext',
  scores: 'ttt_scores'
};

// PUBLIC_INTERFACE
export function calculateWinner(squares) {
  /**
   * Determines the winner of the current board.
   * Returns { winner: 'X' | 'O', line: [a,b,c] } or null if no winner.
   */
  const lines = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  for (let i=0;i<lines.length;i++) {
    const [a,b,c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a,b,c] };
    }
  }
  return null;
}

// PUBLIC_INTERFACE
export function isBoardFull(squares) {
  /** Returns true if all squares are filled. */
  return squares.every(Boolean);
}

// PUBLIC_INTERFACE
export function nextPlayer(xIsNext) {
  /** Returns the symbol of the next player based on xIsNext boolean. */
  return xIsNext ? 'X' : 'O';
}

// PUBLIC_INTERFACE
export function getInitialGameState() {
  /**
   * Returns initial game state. To keep it simple but dynamic, alternate starter based on time.
   */
  const xStarts = (Math.floor(Date.now() / 1000) % 2) === 0 ? 'X' : 'O';
  return { xStarts };
}
