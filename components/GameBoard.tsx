import { useState } from 'react';
import { GameSettings } from './Home';
import Confetti from './ui/confetti';

export const GameBoard = ({
  gridSize,
  winStreak,
  setSettings,
  settings,
}: {
  gridSize: number;
  winStreak: number;
  setSettings: React.Dispatch<React.SetStateAction<GameSettings | null>>;
  settings: GameSettings;
}) => {
  const [board, setBoard] = useState(
    Array(gridSize).fill(Array(gridSize).fill(null))
  );
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState<string | null>(null);

  // This function handles a player's move by updating the board and checking for a win or draw.
  // It updates the board state with the current player's move and then checks whether a win or draw has occurred.
  // If the game is ongoing, it switches the player for the next turn.
  const handleClick = (row: number, col: number) => {
    if (board[row][col] || winner) return;

    const newBoard = board.map((r, i) =>
      r.map((cell: string, j: number) =>
        i === row && j === col ? currentPlayer : cell
      )
    );
    setBoard(newBoard);

    if (checkWin(newBoard, row, col, winStreak)) {
      setWinner(currentPlayer);
    } else if (newBoard.flat().every((cell) => cell)) {
      setWinner('Draw');
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  // This function checks if the current player has won the game by having a streak of consecutive marks
  // It checks all 4 possible directions (horizontal, vertical, diagonal) for a sequence of marks equal to the win streak.
  const checkWin = (
    board: string[][],
    row: number,
    col: number,
    winStreak: number
  ): boolean => {
    const n = board.length;
    const player = board[row][col];
    if (!player) return false;

    const countConsecutive = (dx: number, dy: number): number => {
      let count = 0;
      let r = row;
      let c = col;

      while (r >= 0 && r < n && c >= 0 && c < n && board[r][c] === player) {
        count++;
        r += dx;
        c += dy;
      }

      return count - 1;
    };

    const directions = [
      { dx: 0, dy: 1 },
      { dx: 1, dy: 0 },
      { dx: 1, dy: 1 },
      { dx: 1, dy: -1 },
    ];

    for (const { dx, dy } of directions) {
      const total = 1 + countConsecutive(dx, dy) + countConsecutive(-dx, -dy);
      if (total >= winStreak) {
        return true;
      }
    }

    return false;
  };

  // This function resets the game, clearing the board, setting the winner to null, and starting with player 'X'.
  const resetGame = () => {
    setBoard(Array(gridSize).fill(Array(gridSize).fill(null)));
    setWinner(null);
    setCurrentPlayer('X');
  };

  const handleBack = () => {
    setSettings(null);
  };

  return (
    <>
      <div className='flex flex-col items-center justify-center p-6 space-y-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg shadow-lg relative z-20 max-sm:w-full max-sm:overflow-x-scroll '>
        {winner ? (
          <div className='text-3xl font-bold mb-6'>
            <span className='text-yellow-400'>
              {winner === 'Draw' ? "It's a Draw!" : `Winner: ${winner}`}
            </span>
          </div>
        ) : (
          <div className='text-xl font-semibold mb-6 flex items-center gap-2 text-center'>
            <span>It&apos;s your turn! </span>
            <span
              className={`text-${
                currentPlayer === 'X' ? 'blue' : 'pink'
              }-400 font-bold text-3xl`}
            >
              {currentPlayer}
            </span>
          </div>
        )}

        <div
          className={`grid gap-2 max-sm:overflow-x-scroll`}
          style={{
            gridTemplateColumns: `repeat(${gridSize}, minmax(60px, 1fr))`,
            maxWidth: '100%',
            justifyItems: 'center',
          }}
        >
          {board.map((row, i) =>
            row.map((cell: string, j: number) => (
              <div
                key={`${i}-${j}`}
                onClick={() => handleClick(i, j)}
                className={`flex items-center justify-center border-2 border-gray-700 text-xl cursor-pointer transform transition-all duration-300 hover:scale-105 w-14 h-14 rounded-lg ${
                  cell ? (cell === 'X' ? 'bg-[#4F46E5]' : 'bg-[#EC4899]') : ''
                }`}
                style={{
                  boxShadow: cell ? '0 4px 6px rgba(0, 0, 0, 0.1)' : '',
                }}
              >
                {cell}
              </div>
            ))
          )}
        </div>

        <div className='flex gap-4 items-center'>
          <button
            onClick={resetGame}
            className='bg-red-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-600 transform transition-all duration-300'
          >
            Reset Game
          </button>
          <button
            onClick={handleBack}
            className='bg-white text-blue-500 px-6 py-3 rounded-lg shadow-md hover:bg-gray-100 transform transition-all duration-300'
          >
            Back to Settings
          </button>
        </div>
      </div>
      {winner && settings !== null && (
        <Confetti className='absolute top-0 left-0 w-full h-full z-10' />
      )}
    </>
  );
};
