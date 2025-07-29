import {
  IconAppCalculator,
  IconAppFinder,
  IconAppTrash,
} from 'assets/app-icons/index.ts';
import { ApplicationID } from 'domains/app/applications.ts';
import { useWindows } from 'domains/window/store/states.ts';
import {
  useMinimizedWindows,
  useWindowsAction,
} from 'domains/window/store/store.ts';
import { useEffect, useRef, useState } from 'react';
import { DockItem } from '../DockItem';
import { DockSeparator } from '../DockSeparator';
import * as styles from './Dock.css.ts';

export function Dock() {
  const [mouseX, setMouseX] = useState<number | null>(null);
  const windows = useWindows();
  const minimizedWindows = useMinimizedWindows();
  const {
    restoreWindow,
    openApplication,
    setFocusedWindowID,
    setMinimizedDockIndicatorRef,
  } = useWindowsAction();

  // 애니메이션을 위한 상태 관리
  const [animatingItems, setAnimatingItems] = useState<Set<string>>(new Set());
  const prevMinimizedIdsRef = useRef<string[]>([]);
  const [itemKeys, setItemKeys] = useState<Map<string, string>>(new Map());

  // 새로 minimize된 아이템 감지 및 애니메이션 시작
  useEffect(() => {
    const prevIds = prevMinimizedIdsRef.current;
    const newIds = minimizedWindows.map((window) => window.id);

    // 새로 추가된 아이템 찾기
    const newlyMinimized = newIds.filter((id) => !prevIds.includes(id));

    if (newlyMinimized.length > 0) {
      // 새로 추가된 아이템에 고유한 key 생성
      setItemKeys((prev) => {
        const newMap = new Map(prev);
        newlyMinimized.forEach((id) => {
          newMap.set(id, `${id}-${Date.now()}-${Math.random()}`);
        });
        return newMap;
      });

      setAnimatingItems((prev) => new Set([...prev, ...newlyMinimized]));

      // 애니메이션 완료 후 상태 정리
      const timer = setTimeout(() => {
        setAnimatingItems((prev) => {
          const newSet = new Set(prev);
          newlyMinimized.forEach((id) => newSet.delete(id));
          return newSet;
        });
      }, 1500); // CSS 애니메이션 시간과 맞춤

      return () => clearTimeout(timer);
    }

    prevMinimizedIdsRef.current = newIds;
  }, [minimizedWindows]);

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
      {minimizedWindows.map((window) => (
        <DockItem
          key={itemKeys.get(window.id) || window.id}
          mouseX={mouseX}
          src={IconAppCalculator}
          onClick={() => restoreWindow(window.id)}
          isAnimating={animatingItems.has(window.id)}
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
