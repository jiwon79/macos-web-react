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
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  setX: (x: number) => void;
  setY: (y: number) => void;
  setWidth: (width: number) => void;
  setHeight: (height: number) => void;
}

const WindowContext = createContext<WindowContextProps>({
  id: '',
  x: 0,
  y: 0,
  width: 0,
  height: 0,
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
      id,
      x,
      y,
      width,
      height,
      setX,
      setY,
      setWidth,
      setHeight,
    }),
    [id, x, y, width, height, setX, setY, setWidth, setHeight]
  );

  return (
    <WindowContext.Provider value={context}>
      <div
        id={id}
        style={{
          width: `${width}px`,
          height: `${height}px`,
          transform: `translate(${x}px, ${y}px)`,
        }}
        className={renderer}
      >
        {children}
      </div>
    </WindowContext.Provider>
  );
}
