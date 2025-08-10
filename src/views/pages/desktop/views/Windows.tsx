import { applications } from "domains/app/applications";
import { useWindowsAction, useWindowsStore } from "domains/window/store";
import { WindowRenderer } from "domains/window/views/WindowRenderer/WindowRenderer";

export function Windows() {
  const windows = useWindowsStore((state) => state.windows);
  const minimizedWindows = useWindowsStore((state) => state.minimizedWindows);
  const { updateWindow, setWindowRef } = useWindowsAction();

  const notMinimizedWindows = windows.filter(
    (window) =>
      !minimizedWindows.some(
        (minimizedWindow) => minimizedWindow.id === window.id
      )
  );

  return (
    <>
      {notMinimizedWindows.map((window) => {
        const app = applications[window.appID];
        const resizable = app?.resizable ?? true;

        return (
          <WindowRenderer
            key={window.id}
            ref={(element) => {
              if (element != null) {
                setWindowRef(window.id, element);
              }
            }}
            id={window.id}
            style={window.style}
            resizable={resizable}
            onStyleChange={(style) => {
              updateWindow(window.id, { style });
            }}
          >
            {window.content}
          </WindowRenderer>
        );
      })}
    </>
  );
}
