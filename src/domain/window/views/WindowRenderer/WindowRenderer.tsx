import { createContext, useContext, useMemo } from 'react';
import { renderer } from './WindowRenderer.css.ts';

export interface WindowRendererProps {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  setX: (x: number) => void;
  setY: (y: number) => void;
  setWidth: (width: number) => void;
  setHeight: (height: number) => void;
  children: React.ReactNode;
}

interface WindowContextProps {
  setX: (x: number) => void;
  setY: (y: number) => void;
  setWidth: (width: number) => void;
  setHeight: (height: number) => void;
}

const WindowContext = createContext<WindowContextProps>({
  setX: () => {},
  setY: () => {},
  setWidth: () => {},
  setHeight: () => {},
});

export function useWindowContext() {
  return useContext(WindowContext);
}

export function WindowRenderer({
  id,
  x,
  y,
  width,
  height,
  setX,
  setY,
  setWidth,
  setHeight,
  children,
}: WindowRendererProps) {
  const context = useMemo(
    () => ({
      setX,
      setY,
      setWidth,
      setHeight,
    }),
    [setX, setY, setWidth, setHeight]
  );

  return (
    <WindowContext.Provider value={context}>
      <div
        id={id}
        style={{
          top: y,
          left: x,
          width: `${width}px`,
          height: `${height}px`,
        }}
        className={renderer}
      >
        {children}
      </div>
    </WindowContext.Provider>
  );
}
