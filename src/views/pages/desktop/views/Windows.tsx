import { WindowRenderer } from 'domains/window';
import { useWindows, useWindowsActions } from 'domains/window/store';

export function Windows() {
  const windows = useWindows();
  const { updateWindow } = useWindowsActions();
  return (
    <>
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
    </>
  );
}
