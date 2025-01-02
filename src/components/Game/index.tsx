'use client'

import { useEffect, useCallback } from 'react'
import { PlayerForm } from '../PlayerForm'
import { Board } from '../Board'
import type { GameMode, Players } from '../../types/game'
import { useGameLogic } from '../../hooks/useGameLogic'

interface GameProps {
  initialGameMode?: GameMode | null
  initialPlayers?: Players
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
  } = useGameLogic(initialGameMode)

  // Move initialization to a separate effect
  useEffect(() => {
    if (initialGameMode) {
      setGameMode(initialGameMode)
    }
    if (initialPlayers) {
      setGamePlayers(initialPlayers)
    }
  }, []) // Empty dependency array since these are initial values

  const winner = calculateWinner(currentSquares)

  const handleStartGame = useCallback(({ player1, player2, gameMode }: {
    player1: string
    player2: string
    gameMode: GameMode
  }) => {
    setGameMode(gameMode)
    setGamePlayers({ player1, player2 })
  }, [setGameMode, setGamePlayers])

  const handleReset = useCallback(() => {
    resetGame()
    setGameMode(null)
  }, [resetGame, setGameMode])

  // Show PlayerForm if no game mode is selected
  if (!gameMode) {
    return (
      <div className="game">
        <PlayerForm onStartGame={handleStartGame} />
      </div>
    )
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
          onClick={handleReset}
          aria-label="Reset game"
        >
          Reset Game
        </button>
      </div>
    </div>
  )
} 