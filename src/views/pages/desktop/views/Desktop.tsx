import { Dock } from 'domains/dock/views';
import { useDarkMode } from 'utils/broswer';
import { useWindowsAction } from 'domains/window/store';
import { Windows } from './Windows';
import * as styles from './Desktop.css.ts';
import { DesktopMenu } from './DesktopMenu';

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
    <button onClick={() => setDarkMode(!darkMode)}>
      {darkMode ? '🌙' : '☀️'}
    </button>
  );
}
