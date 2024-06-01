import { Dock } from 'domains/dock/views';
import { useDarkMode } from 'utils/broswer';
import * as styles from './Desktop.css.ts';
import { Windows } from './Windows';
import { Menu } from './Menu';
import { useWindowsAction } from 'domains/window/store';

export function Desktop() {
  const setFocusedWindowID = useWindowsAction(
    (actions) => actions.setFocusedWindowID
  );

  return (
    <div
      className={styles.desktop}
      onMouseDown={(event) => {
        event.preventDefault();
        event.stopPropagation();
        setFocusedWindowID(null);
      }}
    >
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
