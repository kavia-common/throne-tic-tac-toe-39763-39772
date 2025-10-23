import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

function getSquares() {
  return Array.from({ length: 9 }).map((_, i) => screen.getByTestId(`square-${i}`));
}

test('board has 9 squares', () => {
  render(<App />);
  const squares = getSquares();
  expect(squares).toHaveLength(9);
});

test('click toggles mark and status updates', () => {
  render(<App />);
  const squares = getSquares();
  const status = screen.getByTestId('status');

  // Initially should say Next: X
  expect(status.textContent.toLowerCase()).toContain('next');
  expect(status.textContent).toMatch(/X|O/);

  // Click first square
  fireEvent.click(squares[0]);
  // After click, image should exist inside the button
  expect(squares[0].querySelector('img')).toBeInTheDocument();

  // Status should toggle next player
  const text = status.textContent;
  expect(text).toMatch(/Next|Winner|Draw/);
});

test('New Game clears board', () => {
  render(<App />);
  const squares = getSquares();
  const newGameBtn = screen.getByTestId('new-game');

  fireEvent.click(squares[0]);
  expect(squares[0].querySelector('img')).toBeInTheDocument();

  fireEvent.click(newGameBtn);
  // After new game, there should be no images (board cleared)
  const squaresAfter = getSquares();
  expect(squaresAfter.every(btn => btn.querySelector('img') === null)).toBe(true);
});
