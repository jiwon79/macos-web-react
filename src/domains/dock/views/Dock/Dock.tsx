import {
  IconAppCalculator,
  IconAppFinder,
  IconAppTrash,
} from 'assets/app-icons';
import { ApplicationID } from 'domains/app/applications';
import { useWindowsAction, useWindowsStore } from 'domains/window/store/store';
import { animateGenieEffect } from 'domains/window-animation/services/animateGenieEffect';
import { useWindowAnimationAction } from 'domains/window-animation/store';
import { useEffect, useRef, useState } from 'react';
import { DOCK_ITEM_SIZE } from '../DockItem/constant';
import { DockItem } from '../DockItem/DockItem';
import { WindowDockItem } from '../DockItem/WindowDockItem';
import { DockSeparator } from '../DockSeparator';
import * as styles from './Dock.css';

export function Dock() {
  const [mouseX, setMouseX] = useState<number | null>(null);
  const dockRef = useRef<HTMLDivElement>(null);
  const windows = useWindowsStore((state) => state.windows);
  const minimizedWindows = useWindowsStore((state) => state.minimizedWindows);
  const { restoreMinimizedWindow, createAppWindow, setFocusedWindowID } =
    useWindowsAction();
  const {
    setMinimizedDockIndicatorRef,
    startMaximizingWindow,
    stopMaximizingWindow,
    getDockItemElement,
    setDockElement,
  } = useWindowAnimationAction();

  useEffect(() => {
    if (dockRef.current) {
      setDockElement(dockRef.current);
    }
    return () => setDockElement(null);
  }, [setDockElement]);

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

    startMaximizingWindow(minimizedWindow);

    await animateGenieEffect({
      image: minimizedWindow.imageData,
      window: minimizedWindow.window,
      targetContainerY:
        dockRef?.current?.getBoundingClientRect().y ?? minimizedWindow.target.y,
      getTarget: () => {
        const element = getDockItemElement(windowId);
        return (
          element?.getBoundingClientRect() ?? {
            x: minimizedWindow.target.x,
            y: minimizedWindow.target.y,
            width: DOCK_ITEM_SIZE,
          }
        );
      },
      reverse: true,
    });

    stopMaximizingWindow(windowId);
    restoreMinimizedWindow(windowId);
  };

  return (
    <div
      ref={dockRef}
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
          imageData={window.imageData}
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
