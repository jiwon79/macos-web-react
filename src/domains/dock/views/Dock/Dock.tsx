import {
  IconAppCalculator,
  IconAppFinder,
  IconAppTrash,
} from 'assets/app-icons';
import { ApplicationID } from 'domains/app/applications';
import { useWindowsAction, useWindowsStore } from 'domains/window/store/store';
import { animateGenieEffect } from 'domains/window/views/WindowControl/services/animateGenieEffect';
import { useWindowAnimationAction } from 'domains/window-animation/store';
import { useState } from 'react';
import { DockItem } from '../DockItem/DockItem';
import { WindowDockItem } from '../DockItem/WindowDockItem';
import { DockSeparator } from '../DockSeparator';
import * as styles from './Dock.css';

export function Dock() {
  const [mouseX, setMouseX] = useState<number | null>(null);
  const windows = useWindowsStore((state) => state.windows);
  const minimizedWindows = useWindowsStore((state) => state.minimizedWindows);
  const { restoreMinimizedWindow, createAppWindow, setFocusedWindowID } =
    useWindowsAction();
  const { setMinimizedDockIndicatorRef } = useWindowAnimationAction();

  const isOpen = (appID: ApplicationID) => {
    return (
      minimizedWindows.some((window) => window.id === appID) ||
      windows.some((window) => window.appID === appID)
    );
  };

  const onClickDockItem = (appID: ApplicationID) => {
    const isOpened = isOpen(appID);
    if (!isOpened) {
      createAppWindow(appID);
    }

    const isMinimized = minimizedWindows.some((window) => window.id === appID);
    if (isMinimized) {
      onRestoreWindow(appID);
    }

    setFocusedWindowID(appID);
  };

  const onRestoreWindow = async (windowId: string) => {
    const minimizedWindow = minimizedWindows.find((w) => w.id === windowId);
    if (!minimizedWindow) {
      return;
    }

    const img = new Image();
    img.src = minimizedWindow.image;
    await new Promise((resolve) => {
      img.onload = resolve;
    });

    const canvas = document.createElement('canvas');
    canvas.width = minimizedWindow.window.width;
    canvas.height = minimizedWindow.window.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      restoreMinimizedWindow(windowId);
      return;
    }

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    await animateGenieEffect({
      image: imageData,
      window: minimizedWindow.window,
      target: minimizedWindow.target,
      reverse: true,
    });

    restoreMinimizedWindow(windowId);
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
        <WindowDockItem
          key={window.id}
          id={window.id}
          mouseX={mouseX}
          src={window.image}
          onClick={() => onRestoreWindow(window.id)}
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
