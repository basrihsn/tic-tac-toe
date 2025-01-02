import { Game } from '../Game';
import { Snow } from '../Snow';
import { Snowman } from '../Snowman';
import { NewYearCountdown } from '../NewYearCountdown';
import './styles.css';

export const App = () => {
  return (
    <div className="app">
      <Snow />
      <NewYearCountdown />
      <header className="app-header">
        <h1>Tic Tac Toe</h1>
      </header>
      <main>
        <Game />
      </main>
      <footer className="app-footer">
        <p>Built with React & TypeScript 2025 ❤️</p>
      </footer>
      <div className="snowmen-container">
        <Snowman position="left" />
        <Snowman position="right" />
      </div>
    </div>
  );
}; 