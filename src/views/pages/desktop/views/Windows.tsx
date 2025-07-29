import {
  useWindows,
  useWindowsAction,
  useWindowsStore,
} from 'domains/window/store';
import { WindowRenderer } from 'domains/window/views/WindowRenderer/WindowRenderer';

export function Windows() {
  const windows = useWindows();
  const minimizedWindows = useWindowsStore((state) => state.minimizedWindows);
  const { updateWindow, setWindowRef: setWindowRef } = useWindowsAction();

  const notMinimizedWindows = windows.filter(
    (window) =>
      !minimizedWindows.some(
        (minimizedWindow) => minimizedWindow.id === window.id
      )
  );

  return (
    <>
      {notMinimizedWindows &&
        notMinimizedWindows.map((window) => (
          <WindowRenderer
            key={window.id}
            ref={(element) => {
              if (element != null) {
                setWindowRef(window.id, element);
              }
            }}
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
