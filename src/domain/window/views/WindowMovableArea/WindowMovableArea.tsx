import { container } from './WindowMovableArea.css.ts';
import { useWindowContext } from '../WindowRenderer';
import { useRef } from 'react';

interface WindowMovableAreaProps {
  children?: React.ReactNode;
}

export function WindowMovableArea({ children }: WindowMovableAreaProps) {
  const windowContext = useWindowContext();
  const startMouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const startWindow = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const isDragging = useRef<boolean>(false);

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    isDragging.current = true;
    const renderer = document.getElementById(windowContext.id);
    if (renderer === null) {
      return;
    }
    const rect = renderer.getBoundingClientRect();
    startWindow.current = { x: rect.left, y: rect.top };
    startMouse.current = { x: e.clientX, y: e.clientY };
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!isDragging.current) {
      return;
    }
    const curMousePos = { x: e.clientX, y: e.clientY };
    const dx = curMousePos.x - startMouse.current.x;
    const dy = curMousePos.y - startMouse.current.y;
    requestAnimationFrame(() => {
      windowContext.setX(startWindow.current.x + dx);
      windowContext.setY(startWindow.current.y + dy);
    });
  };

  const onMouseUp = () => {
    isDragging.current = false;
  };

  return (
    <div
      className={container}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
    >
      {children}
    </div>
  );
}
