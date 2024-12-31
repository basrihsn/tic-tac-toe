import { Game } from './components/Game';
import './App.css';

export const App = () => {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Tic Tac Toe</h1>
      </header>
      <main>
        <Game />
      </main>
      <footer className="app-footer">
        <p>Built with React & TypeScript 2024 ❤️</p>
      </footer>
    </div>
  );
}; 