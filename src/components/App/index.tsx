import { Game } from '../Game';
import { NewYearCountdown } from '../NewYearCountdown';
import { SeasonSwitcher } from '../season-switcher';
import { SeasonsContainer } from '../seasons/seasons-container';
import { useSeasonStore } from '../../store/use-season-store';
import './styles.css';

export const App = () => {
  const { currentSeason } = useSeasonStore();

  return (
    <>
      <SeasonSwitcher />
      <div className="app" data-season={currentSeason}>
        <SeasonsContainer />
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
      </div>
    </>
  );
}; 