import { MovableEventMap } from 'modules/movable';
import { MovableContainer } from 'modules/movable-react';
import { useRef } from 'react';
import { useWindowContext } from '..';
import { container } from './WindowMovableArea.css.ts';

interface WindowMovableAreaProps {
  children?: React.ReactNode;
}

export function WindowMovableArea({ children }: WindowMovableAreaProps) {
  const { style, onStyleChange } = useWindowContext();

  const initialPosition = useRef<{ x: number; y: number }>();

  const onStartMove = () => {
    initialPosition.current = { x: style.x, y: style.y };
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
