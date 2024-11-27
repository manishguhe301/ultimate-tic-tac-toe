'use client';
import { useState } from 'react';
import { toast } from 'sonner';

export default function GameSettings({
  onStartGame,
}: {
  onStartGame: (gridSize: number, winStreak: number) => void;
}) {
  const [gridSize, setGridSize] = useState(3);
  const [winStreak, setWinStreak] = useState(3);

  const handleStart = () => {
    if (gridSize < 3 || winStreak < 3) {
      toast.error('Grid size and win streak must be at least 3.');
      return;
    }
    if (gridSize > 10 || winStreak > 10) {
      toast.error('Grid size and win streak must be at most 10.');
      return;
    }
    onStartGame(gridSize, winStreak);
  };

  return (
    <div className='flex flex-col items-center justify-center p-6 space-y-6'>
      <div className='flex flex-col md:flex-row items-center gap-6'>
        <div className='flex flex-col items-start'>
          <label className='text-lg font-medium mb-2 text-gray-700'>
            Grid Size (n x n)
          </label>
          <input
            type='number'
            min='3'
            max='10'
            value={gridSize}
            onChange={(e) => setGridSize(Number(e.target.value))}
            className='w-28 px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-gray-900'
          />
        </div>

        <div className='flex flex-col items-start'>
          <label className='text-lg font-medium mb-2 text-gray-700'>
            Win Streak (m)
          </label>
          <input
            type='number'
            min='3'
            max={gridSize}
            value={winStreak}
            onChange={(e) => setWinStreak(Number(e.target.value))}
            className='w-28 px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-gray-900'
          />
        </div>
      </div>

      <button
        onClick={handleStart}
        className='bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:scale-105 transform transition duration-300 ease-in-out focus:ring-4 focus:ring-blue-300'
      >
        Start Game
      </button>
    </div>
  );
}
