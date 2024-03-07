import { Movable, MovableEventMap } from 'modules/movable';
import { HTMLProps, ReactNode, useEffect, useRef } from 'react';
import { noop } from 'utils/functions';
import { usePreservedCallback } from 'utils/react';

interface MovableContainerProps extends HTMLProps<HTMLDivElement> {
  onMove?: (event: MovableEventMap['move']) => void;
  onStartMove?: (event: MovableEventMap['startMove']) => void;
  onEndMove?: (event: MovableEventMap['endMove']) => void;
  children?: ReactNode;
}

export function MovableContainer({
  onMove,
  onStartMove,
  onEndMove,
  children,
  ...restProps
}: MovableContainerProps) {
  const movable = useRef<Movable>();
  const handlerRef = useRef<HTMLDivElement>(null);

  const preservedOnMove = usePreservedCallback(onMove ?? noop);
  const preservedOnStartMove = usePreservedCallback(onStartMove ?? noop);
  const preservedOnEndMove = usePreservedCallback(onEndMove ?? noop);

  useEffect(() => {
    if (!handlerRef.current) {
      return;
    }

    movable.current = new Movable(handlerRef.current, { manual: false });

    movable.current.on('move', preservedOnMove);
    movable.current.on('startMove', preservedOnStartMove);
    movable.current.on('endMove', preservedOnEndMove);

    return () => {
      movable.current?.destroy();
    };
  }, [preservedOnMove, preservedOnEndMove, preservedOnStartMove]);

  return (
    <div
      ref={handlerRef}
      onMouseDown={(event) => movable.current?.onMouseDown(event.nativeEvent)}
      {...restProps}
    >
      {children}
    </div>
  );
}
