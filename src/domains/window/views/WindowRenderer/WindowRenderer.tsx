import { WindowStyle } from 'domains/window/interface';
import { useWindowsAction } from 'domains/window/store';
import { useMemo } from 'react';
import { WindowContext } from '../WindowContext.ts';
import { WindowResize } from '../WindowResize';
import { renderer } from './WindowRenderer.css.ts';

export interface WindowRendererProps {
  id: string;
  style: WindowStyle;
  onStyleChange: (style: Partial<WindowStyle>) => void;
  children: React.ReactNode;
}

export function WindowRenderer({
  id,
  style,
  onStyleChange,
  children,
}: WindowRendererProps) {
  const { setFocusedWindowID } = useWindowsAction();

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
        onMouseDown={(event) => {
          event.preventDefault();
          event.stopPropagation();
          setFocusedWindowID(id);
        }}
        className={renderer}
      >
        <WindowResize>{children}</WindowResize>
      </div>
    </WindowContext.Provider>
  );
}
