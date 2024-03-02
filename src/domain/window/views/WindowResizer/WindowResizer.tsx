import { ReactNode, useRef } from 'react';
import {
  WindowLineResizeHandler,
  WindowLineResizeHandlerPosition,
  WindowCornerResizeHandler,
  WindowCornerResizeHandlerPosition,
} from './components';
import { WindowResizeHandlerBaseProps } from './interfaces';
import { ResizableEventByType } from '../../../../module/resizable/interfaces';
import { useWindowContext } from '..';
import { WindowStyle } from '../../interface';

const pointResizeHandlerPositions = [
  'top-left',
  'top-right',
  'bottom-left',
  'bottom-right',
] satisfies WindowCornerResizeHandlerPosition[];

const lineResizeHandlerPositions = [
  'top',
  'bottom',
  'left',
  'right',
] satisfies WindowLineResizeHandlerPosition[];

export function WindowResizer({ children }: { children?: ReactNode }) {
  const { style, onStyleChange } = useWindowContext();
  const initialStyleRef = useRef<WindowStyle | undefined>(undefined);

  const handleResize = (event: ResizableEventByType['resize']) => {
    const initialStyle = initialStyleRef.current;
    if (initialStyle === undefined) {
      return;
    }
    (() => {
      const deltaWidth = event.delta.width;
      if (deltaWidth === undefined || event.width === undefined) {
        return;
      }

      if (event.horizontalPositiveDeltaDirection === 'left') {
        onStyleChange({
          x: initialStyle.x - deltaWidth,
          width: initialStyle.width + deltaWidth,
        });
        return;
      }
      if (event.horizontalPositiveDeltaDirection === 'right') {
        onStyleChange({
          width: initialStyle.width + deltaWidth,
        });
      }
    })();
    (() => {
      const deltaHeight = event.delta.height;
      if (deltaHeight === undefined || event.height === undefined) {
        console.log('no deltaHeight');
        return;
      }

      if (event.verticalPositiveDeltaDirection === 'top') {
        onStyleChange({
          y: initialStyle.y - deltaHeight,
          height: initialStyle.height + deltaHeight,
        });
        return;
      }
      if (event.verticalPositiveDeltaDirection === 'bottom') {
        onStyleChange({
          height: initialStyle.height + deltaHeight,
        });
      }
    })();
  };

  const frameRef = useRef<HTMLDivElement>(null);

  const handleResizeStart: WindowResizeHandlerBaseProps['onResizeStart'] =
    () => {
      initialStyleRef.current = style;
    };

  const handleResizeEnd: WindowResizeHandlerBaseProps['onResizeEnd'] = () => {
    initialStyleRef.current = undefined;
  };

  return (
    <div ref={frameRef}>
      {lineResizeHandlerPositions.map((position) => (
        <WindowLineResizeHandler
          frameRef={frameRef}
          position={position}
          onResize={handleResize}
          onResizeStart={handleResizeStart}
          onResizeEnd={handleResizeEnd}
          key={position}
        />
      ))}
      {pointResizeHandlerPositions.map((position) => (
        <WindowCornerResizeHandler
          frameRef={frameRef}
          position={position}
          onResize={handleResize}
          onResizeStart={handleResizeStart}
          onResizeEnd={handleResizeEnd}
          key={position}
        />
      ))}
      {children}
    </div>
  );
}
