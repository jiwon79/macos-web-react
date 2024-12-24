import { useWindows, useWindowsAction } from 'domains/window/store';
import { WindowRenderer } from 'domains/window/views/WindowRenderer/WindowRenderer';

export function Windows() {
  const windows = useWindows();
  const { updateWindow } = useWindowsAction();

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
