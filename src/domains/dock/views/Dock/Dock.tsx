import {
  IconAppCalculator,
  IconAppFinder,
  IconAppTrash
} from "assets/app-icons";
import type { ApplicationID } from "domains/app/applications";
import { useDockAction } from "domains/dock/store";
import { useWindowsAction, useWindowsStore } from "domains/window/store/store";
import { animateGenieEffect } from "domains/window-animation/services/animateGenieEffect";
import { useWindowAnimationAction } from "domains/window-animation/store";
import { useEffect, useRef } from "react";
import { DockItem } from "../DockItem/DockItem";
import { WindowDockItem } from "../DockItem/WindowDockItem";
import { DockSeparator } from "../DockSeparator";
import * as styles from "./Dock.css";

export function Dock() {
  const dockRef = useRef<HTMLDivElement>(null);
  const windows = useWindowsStore((state) => state.windows);
  const minimizedWindows = useWindowsStore((state) => state.minimizedWindows);
  const isDraggingWindow = useWindowsStore((state) => state.isDraggingWindow);
  const isResizingWindow = useWindowsStore((state) => state.isResizingWindow);
  const disableHover = isDraggingWindow || isResizingWindow;

  const { restoreMinimizedWindow, createAppWindow, setFocusedWindowID } =
    useWindowsAction();
  const {
    setMinimizedDockIndicatorRef,
    startRestoringWindow,
    stopRestoringWindow,
    getDockItemElement,
    setDockElement
  } = useWindowAnimationAction();
  const { setMouseX } = useDockAction();

  useEffect(() => {
    if (dockRef.current) {
      setDockElement(dockRef.current);
    }
    return () => setDockElement(null);
  }, [setDockElement]);

  const isOpen = (appID: ApplicationID) => {
    return (
      minimizedWindows.some((window) => window.appID === appID) ||
      windows.some((window) => window.appID === appID)
    );
  };

  const onClickDockItem = (appID: ApplicationID) => {
    // Check if app has a minimized window
    const minimizedWindow = minimizedWindows.find((window) => window.appID === appID);
    
    // Check if app has an active window
    const activeWindow = windows.find((window) => window.appID === appID);
    
    if (minimizedWindow) {
      // Restore minimized window
      onRestoreWindow(minimizedWindow.id);
    } else if (activeWindow) {
      // Focus existing window
      setFocusedWindowID(activeWindow.id);
    } else {
      // Create new window
      createAppWindow(appID);
    }
  };

  const onRestoreWindow = async (windowId: string) => {
    const minimizedWindow = minimizedWindows.find((w) => w.id === windowId);
    if (!minimizedWindow) {
      return;
    }

    startRestoringWindow(minimizedWindow);

    await animateGenieEffect({
      image: minimizedWindow.imageData,
      window: minimizedWindow.window,
      getTarget: () => {
        const dockRect = dockRef.current?.getBoundingClientRect();
        const rect = getDockItemElement(windowId)?.getBoundingClientRect();
        return {
          x: rect?.x ?? 0,
          y: dockRect?.y ?? 0,
          width: rect?.width ?? 0
        };
      },
      reverse: true
    });

    stopRestoringWindow(windowId);
    restoreMinimizedWindow(windowId);
  };

  return (
    <div
      ref={dockRef}
      className={styles.container}
      onMouseMove={(event) => !disableHover && setMouseX(event.clientX)}
      onMouseLeave={() => !disableHover && setMouseX(null)}
    >
      <DockItem 
        src={IconAppFinder} 
        open={isOpen("Finder")}
        onClick={() => onClickDockItem("Finder")}
      />
      <DockSeparator />
      <DockItem
        src={IconAppCalculator}
        open={isOpen("calculator")}
        onClick={() => onClickDockItem("calculator")}
      />
      <DockSeparator />
      {minimizedWindows.map((window) => (
        <WindowDockItem
          key={window.id}
          windowId={window.id}
          image={window.imageData}
          onClick={() => onRestoreWindow(window.id)}
        />
      ))}
      <div
        className={styles.minimizedDockIndicator}
        ref={setMinimizedDockIndicatorRef}
      />
      <DockItem src={IconAppTrash} />
    </div>
  );
}
