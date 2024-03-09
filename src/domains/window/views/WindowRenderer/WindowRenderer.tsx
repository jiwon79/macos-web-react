import { createContext, useContext, useMemo } from 'react';
import { renderer } from './WindowRenderer.css.ts';
import { WindowStyle } from 'domains/window/interface';
import { useWindowsActions } from 'domains/window/store';
import { WindowResize } from '../WindowResize';

export interface WindowRendererProps {
  id: string;
  style: WindowStyle;
  onStyleChange: (style: Partial<WindowStyle>) => void;
  children: React.ReactNode;
}

interface WindowContextProps {
  id: string;
  style: WindowStyle;
  onStyleChange: (style: Partial<WindowStyle>) => void;
}

const WindowContext = createContext<WindowContextProps>({
  id: '',
  style: {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  },
  onStyleChange: () => {},
});

export function useWindowContext() {
  return useContext(WindowContext);
}

export function WindowRenderer({
  id,
  style,
  onStyleChange,
  children,
}: WindowRendererProps) {
  const { setFocusedWindowID } = useWindowsActions();
  const context = useMemo(
    () => ({
      id,
      style,
      onStyleChange,
    }),
    [id, style, onStyleChange]
  );
  const { x, y, width, height } = style;

  return (
    <WindowContext.Provider value={context}>
      <div
        id={id}
        style={{
          width: `${width}px`,
          height: `${height}px`,
          transform: `translate(${x}px, ${y}px)`,
        }}
        onMouseDown={() => setFocusedWindowID(id)}
        className={renderer}
      >
        <WindowResize>{children}</WindowResize>
      </div>
    </WindowContext.Provider>
  );
}
