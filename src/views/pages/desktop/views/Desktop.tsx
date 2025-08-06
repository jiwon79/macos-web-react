import { Dock } from 'domains/dock/views';
import { useWindowsAction } from 'domains/window/store';
import { useDarkMode } from 'utils/browser/index.ts';
import * as styles from './Desktop.css.ts';
import { DesktopMenu } from './DesktopMenu';
import { Windows } from './Windows';

export function Desktop() {
  const { setFocusedWindowID } = useWindowsAction();

  return (
    <div
      className={styles.desktop}
      onMouseDown={() => setFocusedWindowID(null)}
    >
      <DesktopMenu />
      <DarkModeButtonXX />
      <Windows />
      <Dock />
    </div>
  );
}

function DarkModeButtonXX() {
  const [darkMode, setDarkMode] = useDarkMode();

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      style={{ position: 'absolute', top: 40 }}
    >
      {darkMode ? '🌙' : '☀️'}
    </button>
  );
}
