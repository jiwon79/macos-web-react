import {
  IconAppCalculator,
  IconAppFinder,
  IconAppTrash,
} from 'assets/app-icons/index.ts';
import { ApplicationID } from 'domains/app/applications.ts';
import {
  useWindowsAction,
  useWindowsStore,
} from 'domains/window/store/store.ts';
import { useState } from 'react';
import { DockItem } from '../DockItem';
import { DockSeparator } from '../DockSeparator';
import * as styles from './Dock.css.ts';

export function Dock() {
  const [mouseX, setMouseX] = useState<number | null>(null);
  const windows = useWindowsStore((state) => state.windows);
  const minimizingWindows = useWindowsStore((state) => state.minimizingWindows);
  const minimizedWindows = useWindowsStore((state) => state.minimizedWindows);
  const {
    restoreMinimizedWindow,
    openApplication,
    setFocusedWindowID,
    setMinimizedDockIndicatorRef,
  } = useWindowsAction();

  const isOpen = (appID: ApplicationID) => {
    return (
      minimizedWindows.some((window) => window.id === appID) ||
      windows.some((window) => window.appID === appID)
    );
  };

  const onClickDockItem = (appID: ApplicationID) => {
    const isOpened = isOpen(appID);
    if (!isOpened) {
      openApplication(appID);
    }

    const isMinimized = minimizedWindows.some((window) => window.id === appID);
    if (isMinimized) {
      restoreMinimizedWindow(appID);
    }

    setFocusedWindowID(appID);
  };

  return (
    <div
      className={styles.container}
      onMouseMove={(event) => setMouseX(event.clientX)}
      onMouseLeave={() => setMouseX(null)}
    >
      <DockItem mouseX={mouseX} src={IconAppFinder} open={isOpen('Finder')} />
      <DockSeparator />
      <DockItem
        mouseX={mouseX}
        src={IconAppCalculator}
        open={isOpen('calculator')}
        onClick={() => onClickDockItem('calculator')}
      />
      <DockSeparator />
      {minimizedWindows.map((window) => (
        <DockItem
          key={window.id}
          mouseX={mouseX}
          src={window.image}
          onClick={() => restoreMinimizedWindow(window.id)}
          isAnimating={minimizingWindows.some(
            (minimizingWindow) => minimizingWindow.id === window.id
          )}
        />
      ))}
      <div
        className={styles.minimizedDockIndicator}
        ref={setMinimizedDockIndicatorRef}
      />
      <DockItem mouseX={mouseX} src={IconAppTrash} />
    </div>
  );
}
