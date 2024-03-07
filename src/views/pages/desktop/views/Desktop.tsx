import { WindowRenderer } from 'domains/window';
import { useWindows, useWindowsActions } from 'domains/window/store';
import * as styles from './Desktop.css.ts';

export function Desktop() {
  const windows = useWindows();
  const { updateWindow } = useWindowsActions();

  return (
    <div className={styles.desktop}>
      <p>MENU</p>
      {windows &&
        windows.map((window) => (
          <WindowRenderer
            key={window.id}
            id={window.id}
            style={window.style}
            onStyleChange={(style) => {
              updateWindow(window.id, { style });
            }}
          >
            {window.content}
          </WindowRenderer>
        ))}
      <p>DOCK</p>
    </div>
  );
}
