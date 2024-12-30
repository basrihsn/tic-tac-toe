export type GameMode = 'single' | 'pvp' | 'computer' | null;

export type Player = {
  name: string;
  symbol: 'X' | 'O';
};

export type Players = {
  player1: string;
  player2: string;
};

export type Square = string | null;
export type Squares = Array<Square>;

export type GameState = {
  history: Squares[];
  currentMove: number;
  gameMode: GameMode;
  players: Players;
};

export type WinningLine = [number, number, number]; 