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
import {
  useWindowControlAction,
  useWindowControlStore,
} from 'domains/window-animation/windowControlStore.ts';
import { useState } from 'react';
import { DockItem } from '../DockItem';
import { DockSeparator } from '../DockSeparator';
import * as styles from './Dock.css.ts';

// 1. 이미지, 위치 등 필요한 정보 계산 (minimizedWindow, 나중에 최대화 할 때도 필요한 정보)
// 2. 애니메이션 중에만 필요한 정보 > animation store에 관련 정보 저장
// 3. 애니메이션 함수 실행

export function Dock() {
  const [mouseX, setMouseX] = useState<number | null>(null);
  const windows = useWindowsStore((state) => state.windows);
  const minimizedWindows = useWindowsStore((state) => state.minimizedWindows);
  const { restoreMinimizedWindow, createAppWindow, setFocusedWindowID } =
    useWindowsAction();
  const minimizingWindows = useWindowControlStore(
    (state) => state.minimizingWindows
  );
  const { setMinimizedDockIndicatorRef } = useWindowControlAction();

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
