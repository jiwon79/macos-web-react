import { Dock } from 'domains/dock/views';
import { useDarkMode } from 'utils/broswer';
import * as styles from './Desktop.css.ts';
import { Windows } from './Windows';
import { Menu } from './Menu';

export function Desktop() {
  return (
    <div className={styles.desktop}>
      <DarkModeButtonXX />
      <Menu />
      <Windows />
      <Dock />
    </div>
  );
}

function DarkModeButtonXX() {
  const [darkMode, setDarkMode] = useDarkMode();

  return (
    <button onClick={() => setDarkMode(!darkMode)}>
      {darkMode ? '🌙' : '☀️'}
    </button>
  );
}
