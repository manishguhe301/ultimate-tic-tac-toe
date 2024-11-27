'use client';
import { useState } from 'react';
import GameSettings from './GameSettings';
import { GameBoard } from './GameBoard';

export interface GameSettings {
  gridSize: number;
  winStreak: number;
}

export default function Home() {
  const [settings, setSettings] = useState<GameSettings | null>(null);

  const handleStartGame = (gridSize: number, winStreak: number) => {
    setSettings({ gridSize, winStreak });
  };

  return (
    <div className='min-h-screen flex flex-col bg-gradient-to-br from-gray-800 via-purple-700 to-gray-900 text-white p-6'>
      <div className='flex flex-col flex-grow items-center justify-center'>
        {!settings ? (
          <div className='text-center space-y-12 flex flex-col items-center justify-center'>
            <div>
              <h1 className='text-6xl font-extrabold tracking-wide drop-shadow-md'>
                Ultimate Tic-Tac-Toe
              </h1>
              <p className='text-lg mt-4 text-gray-300 font-medium'>
                Customize your game and compete with your friends in this modern
                twist to the classic Tic-Tac-Toe.
              </p>
            </div>
            <div className='w-full max-w-lg bg-gradient-to-r from-purple-700 via-indigo-500 to-purple-700 text-white rounded-xl shadow-2xl p-8 relative'>
              <div className='absolute -top-5 left-1/2 transform -translate-x-1/2 bg-yellow-400 w-16 h-16 rounded-full shadow-md flex items-center justify-center'>
                <span className='text-3xl font-bold text-purple-800'>🎮</span>
              </div>
              <div className='bg-white text-gray-900 p-6 rounded-lg shadow-md mt-8'>
                {/* this below component is for setting the grid  size and win streak */}
                <GameSettings onStartGame={handleStartGame} />
              </div>
            </div>
          </div>
        ) : (
          // this below component is for playing the game
          <GameBoard
            gridSize={settings.gridSize}
            winStreak={settings.winStreak}
            setSettings={setSettings}
            settings={settings}
          />
        )}
      </div>

      <footer className='text-sm text-gray-400 mt-4 text-center'>
        © 2024 Ultimate Tic-Tac-Toe. All rights reserved.
      </footer>
    </div>
  );
}
