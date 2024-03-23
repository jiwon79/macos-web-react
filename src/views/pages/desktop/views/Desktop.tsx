import { Dock } from 'domains/dock/views';
import { useDarkMode } from 'utils/broswer';
import * as styles from './Desktop.css.ts';
import { Windows } from './Windows';

export function Desktop() {
  const [darkMode] = useDarkMode();

  return (
    <div
      className={styles.desktop}
      style={{
        backgroundImage: `url(/src/assets/wallpapers/wallpaper_${darkMode ? 'dark' : 'light'}.png)`,
      }}
    >
      <DarkModeButtonXX />
      <p>MENU</p>
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
