import { useState, useCallback } from 'react';
import type { GameMode, Players, Squares } from '../types/game';
import { calculateWinner } from '../utils/gameUtils';

export const useGameLogic = (initialMode: GameMode = null) => {
  const [history, setHistory] = useState<Squares[]>([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [gameMode, setGameMode] = useState<GameMode>(initialMode);
  const [players, setPlayers] = useState<Players>({ player1: 'Player 1', player2: 'Player 2' });

  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;

  const handlePlay = useCallback((nextSquares: Squares) => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }, [history, currentMove]);

  const makeComputerMove = useCallback(() => {
    if (!xIsNext && (gameMode === 'computer' || gameMode === 'single')) {
      const availableSquares = currentSquares
        .map((square, index) => square === null ? index : null)
        .filter((index): index is number => index !== null);

      if (availableSquares.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableSquares.length);
        const computerMove = availableSquares[randomIndex];
        const nextSquares = currentSquares.slice();
        nextSquares[computerMove] = 'O';
        handlePlay(nextSquares);
      }
    }
  }, [xIsNext, gameMode, currentSquares, handlePlay]);

  const resetGame = useCallback(() => {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
  }, []);

  return {
    currentSquares,
    xIsNext,
    gameMode,
    players,
    calculateWinner,
    handlePlay,
    makeComputerMove,
    setGameMode,
    setGamePlayers: setPlayers,
    resetGame,
  };
}; 