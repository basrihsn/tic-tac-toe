import type { Square as SquareType } from '../../types/game';
import './styles.css';

interface SquareProps {
  value: SquareType;
  onSquareClick: () => void;
}

export const Square = ({ value, onSquareClick }: SquareProps) => {
  return (
    <button 
      className="square"
      onClick={onSquareClick}
      aria-label={value || 'Empty square'}
    >
      {value}
    </button>
  );
}; 