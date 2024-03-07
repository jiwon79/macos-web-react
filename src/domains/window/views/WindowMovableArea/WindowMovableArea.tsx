import { useWindowContext } from '..';
import { container } from './WindowMovableArea.css.ts';
import { useWindowsActions } from 'domains/window/store';
import { MovableEventMap } from 'modules/movable';
import { MovableContainer } from 'modules/movable-react';
import { useRef } from 'react';

interface WindowMovableAreaProps {
  children?: React.ReactNode;
}

export function WindowMovableArea({ children }: WindowMovableAreaProps) {
  const { id: windowID, style, onStyleChange } = useWindowContext();
  const { setFocusedWindowID } = useWindowsActions();

  const initialPosition = useRef<{ x: number; y: number }>();

  const onStartMove = () => {
    initialPosition.current = { x: style.x, y: style.y };
    setFocusedWindowID(windowID);
  };

  const monMove = (event: MovableEventMap['move']) => {
    if (!initialPosition.current) {
      return;
    }
    onStyleChange({
      x: initialPosition.current.x + event.delta.x,
      y: initialPosition.current.y + event.delta.y,
    });
  };

  return (
    <MovableContainer
      className={container}
      onStartMove={onStartMove}
      onMove={monMove}
    >
      {children}
    </MovableContainer>
  );
}
