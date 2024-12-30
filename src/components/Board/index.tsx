import React, { useEffect } from 'react';
import type { GameMode, Players, Square as SquareType } from '../../types/game';
import { celebrateWin } from '../../utils/confetti';
import { Square } from '../Square';
import './styles.css';

interface BoardProps {
  xIsNext: boolean;
  squares: SquareType[];
  onPlay: (squares: SquareType[]) => void;
  gameMode: GameMode;
  players: Players;
  winner: string | null;
  onComputerMove: () => void;
}

export const Board = ({ 
  xIsNext, 
  squares, 
  onPlay, 
  gameMode, 
  players, 
  winner,
  onComputerMove 
}: BoardProps) => {
  useEffect(() => {
    if (winner) {
      celebrateWin();
    }
  }, [winner]);

  useEffect(() => {
    if (gameMode === 'computer' && !xIsNext && !winner) {
      const timer = setTimeout(onComputerMove, 500);
      return () => clearTimeout(timer);
    }
  }, [xIsNext, winner, gameMode, onComputerMove]);

  const handleClick = (i: number) => {
    if (winner || squares[i] || (gameMode === 'computer' && !xIsNext)) {
      return;
    }

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares);
  };

  const getWinnerText = () => {
    if (!winner) return null;

    if (gameMode === 'computer') {
      const winnerName = winner === 'X' ? players.player1 : 'Computer';
      return <span className="winner">Winner: {winnerName}</span>;
    }

    const winnerName = winner === 'X' ? players.player1 : players.player2;
    return <span className="winner">Winner: {winnerName}</span>;
  };

  const getNextPlayerText = () => {
    if (gameMode === 'computer') {
      return `Next player: ${xIsNext ? players.player1 : 'Computer'}`;
    }
    return `Next player: ${xIsNext ? players.player1 : players.player2}`;
  };

  const getStatus = () => {
    if (winner) {
      return getWinnerText();
    }
    
    if (squares.every(square => square)) {
      return "Game is a draw!";
    }
    
    return getNextPlayerText();
  };

  return (
    <div className="board-container">
      <div className="board">
        <div className="status">{getStatus()}</div>
        {[0, 1, 2].map((row) => (
          <div key={row} className="board-row">
            {[0, 1, 2].map((col) => {
              const index = row * 3 + col;
              return (
                <Square
                  key={index}
                  value={squares[index]}
                  onSquareClick={() => handleClick(index)}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}; 