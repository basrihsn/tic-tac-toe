import { useState, useCallback } from 'react'
import type { GameMode, Players, Square } from '../types/game'

export function useGameLogic(initialMode: GameMode | null = null) {
  const [currentSquares, setCurrentSquares] = useState<Square[]>(Array(9).fill(null))
  const [xIsNext, setXIsNext] = useState(true)
  const [gameMode, setGameMode] = useState<GameMode | null>(initialMode)
  const [players, setGamePlayers] = useState<Players>({
    player1: 'Player 1',
    player2: 'Player 2'
  })

  const calculateWinner = useCallback((squares: Square[]): string | null => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]

    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]
      }
    }

    return null
  }, [])

  const handlePlay = useCallback((nextSquares: Square[]) => {
    setCurrentSquares(nextSquares)
    setXIsNext(!xIsNext)
  }, [xIsNext])

  const makeComputerMove = useCallback(() => {
    const emptySquares = currentSquares
      .map((square, index) => square === null ? index : null)
      .filter((index): index is number => index !== null)

    if (emptySquares.length > 0) {
      const randomIndex = Math.floor(Math.random() * emptySquares.length)
      const newSquares = [...currentSquares]
      newSquares[emptySquares[randomIndex]] = xIsNext ? 'X' : 'O'
      handlePlay(newSquares)
    }
  }, [currentSquares, xIsNext, handlePlay])

  const resetGame = useCallback(() => {
    setCurrentSquares(Array(9).fill(null))
    setXIsNext(true)
  }, [])

  return {
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
  }
} 