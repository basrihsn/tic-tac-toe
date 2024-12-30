import { useState } from 'react';
import type { GameMode } from '../../types/game';
import './styles.css';

interface GameSetup {
  player1: string;
  player2: string;
  gameMode: GameMode;
}

interface PlayerFormProps {
  onStartGame: (setup: GameSetup) => void;
}

export const PlayerForm = ({ onStartGame }: PlayerFormProps) => {
  const [gameMode, setGameMode] = useState<GameMode>('single');
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStartGame({
      player1: player1.trim() || 'Player 1',
      player2: player2.trim() || 'Player 2',
      gameMode
    });
  };

  return (
    <form className="player-form" onSubmit={handleSubmit}>
      <h2>Game Setup</h2>
      
      <div className="game-mode-selector">
        <label>
          <input
            type="radio"
            value="single"
            checked={gameMode === 'single'}
            onChange={(e) => setGameMode(e.target.value as GameMode)}
          />{' '}
          Single Player
        </label>
        <label>
          <input
            type="radio"
            value="pvp"
            checked={gameMode === 'pvp'}
            onChange={(e) => setGameMode(e.target.value as GameMode)}
          />{' '}
          2 Player
        </label>
        <label>
          <input
            type="radio"
            value="computer"
            checked={gameMode === 'computer'}
            onChange={(e) => setGameMode(e.target.value as GameMode)}
          />{' '}
          vs Computer
        </label>
      </div>

      <div className="form-group">
        <label htmlFor="player1">Player 1 Name:</label>
        <input
          type="text"
          id="player1"
          value={player1}
          onChange={(e) => setPlayer1(e.target.value)}
          placeholder="Enter Player 1 name"
        />
      </div>

      {gameMode === 'pvp' && (
        <div className="form-group">
          <label htmlFor="player2">Player 2 Name:</label>
          <input
            type="text"
            id="player2"
            value={player2}
            onChange={(e) => setPlayer2(e.target.value)}
            placeholder="Enter Player 2 name"
          />
        </div>
      )}

      <button type="submit" className="start-button">
        Start Game
      </button>
    </form>
  );
}; 