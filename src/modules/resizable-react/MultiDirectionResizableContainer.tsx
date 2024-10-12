import { ReactNode, useRef } from 'react';
import { ResizableEventMap } from '../resizable/interfaces';
import { CornerResizeHandler,LineResizeHandler } from './components';
import {
  CornerResizeHandlerPosition,
  LineResizeHandlerPosition,
  ResizeHandlerBaseProps,
} from './interfaces';

const pointResizeHandlerPositions: CornerResizeHandlerPosition[] = [
  'top-left',
  'top-right',
  'bottom-left',
  'bottom-right',
];

const lineResizeHandlerPositions: LineResizeHandlerPosition[] = [
  'top',
  'bottom',
  'left',
  'right',
];

interface MultiResizableContainerProps {
  onResize?: (event: ResizableEventMap['resize']) => void;
  onResizeStart?: ResizeHandlerBaseProps['onResizeStart'];
  onResizeEnd?: ResizeHandlerBaseProps['onResizeEnd'];
  children?: ReactNode;
}

export function MultiDirectionResizableContainer({
  onResize,
  onResizeStart,
  onResizeEnd,
  children,
}: MultiResizableContainerProps) {
  const frameRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={frameRef} style={{ width: '100%', height: '100%' }}>
      {lineResizeHandlerPositions.map((position) => (
        <LineResizeHandler
          frameRef={frameRef}
          position={position}
          onResize={onResize}
          onResizeStart={onResizeStart}
          onResizeEnd={onResizeEnd}
          key={position}
        />
      ))}
      {pointResizeHandlerPositions.map((position) => (
        <CornerResizeHandler
          frameRef={frameRef}
          position={position}
          onResize={onResize}
          onResizeStart={onResizeStart}
          onResizeEnd={onResizeEnd}
          key={position}
        />
      ))}
      {children}
    </div>
  );
}
