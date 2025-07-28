import {
  IconAppCalculator,
  IconAppFinder,
  IconAppTrash,
} from 'assets/app-icons/index.ts';
import { ApplicationID } from 'domains/app/applications.ts';
import { useWindows } from 'domains/window/store/states.ts';
import {
  useMinimizedWindowIds,
  useWindowsAction,
} from 'domains/window/store/store.ts';
import { useState } from 'react';
import { DockItem } from '../DockItem';
import { DockSeparator } from '../DockSeparator';
import * as styles from './Dock.css.ts';

export function Dock() {
  const [mouseX, setMouseX] = useState<number | null>(null);
  const windows = useWindows();
  const minimizedWindowIds = useMinimizedWindowIds();
  const {
    restoreWindow,
    openApplication,
    setFocusedWindowID,
    setMinimizedDockIndicatorRef,
  } = useWindowsAction();

  const isOpen = (appID: ApplicationID) => {
    return (
      minimizedWindowIds.includes(appID) ||
      windows.some((window) => window.appID === appID)
    );
  };

  const onClickDockItem = (appID: ApplicationID) => {
    const isOpened = isOpen(appID);
    if (!isOpened) {
      openApplication(appID);
    }

    const isMinimized = minimizedWindowIds.includes(appID);
    if (isMinimized) {
      restoreWindow(appID);
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
      {minimizedWindowIds.map((id) => (
        <DockItem
          key={id}
          mouseX={mouseX}
          src={IconAppCalculator}
          onClick={() => restoreWindow(id)}
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
