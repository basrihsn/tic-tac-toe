import { useEffect } from 'react';
import { Board } from '../Board';
import { PlayerForm } from '../PlayerForm';
import { useGameLogic } from '../../hooks/useGameLogic';
import type { GameMode, Players } from '../../types/game';
import './styles.css';

interface GameProps {
  initialGameMode?: GameMode;
  initialPlayers?: Players;
}

export const Game = ({ 
  initialGameMode = null,
  initialPlayers = { player1: 'Player 1', player2: 'Player 2' }
}: GameProps) => {
  const {
    currentSquares,
    xIsNext,
    gameMode,
    players,
    calculateWinner,
    handlePlay,
    makeComputerMove,
    setGameMode,
    setGamePlayers,
    resetGame
  } = useGameLogic(initialGameMode);

  useEffect(() => {
    if (initialGameMode) {
      setGameMode(initialGameMode);
    }
    if (initialPlayers) {
      setGamePlayers(initialPlayers);
    }
  }, [initialGameMode, initialPlayers, setGameMode, setGamePlayers]);

  const winner = calculateWinner(currentSquares);

  // Show PlayerForm if no game mode is selected
  if (!gameMode) {
    return (
      <div className="game">
        <PlayerForm 
          onStartGame={({ player1, player2, gameMode }) => {
            setGameMode(gameMode);
            setGamePlayers({ player1, player2 });
          }} 
        />
      </div>
    );
  }

  return (
    <div className="game">
      <div className="game-board animate-fade-in">
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
          gameMode={gameMode}
          players={players}
          winner={winner}
          onComputerMove={makeComputerMove}
        />
      </div>
      <div className="game-info animate-slide-in">
        <button 
          className="reset-button"
          onClick={() => {
            resetGame();
            setGameMode(null); // Reset to show PlayerForm again
          }}
          aria-label="Reset game"
        >
          Reset Game
        </button>
      </div>
    </div>
  );
}; 