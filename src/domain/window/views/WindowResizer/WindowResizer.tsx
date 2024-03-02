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
  const { x, y, setX, setY, width, height, setWidth, setHeight } =
    useWindowContext();
  const initialStyleRef = useRef<
    | {
        x: number;
        y: number;
        width: number;
        height: number;
      }
    | undefined
  >(undefined);

  const handleResize = (event: ResizableEventByType['resize']) => {
    const initialStyle = initialStyleRef.current;
    console.log('@event', event, initialStyle);
    if (initialStyle === undefined) {
      return;
    }
    (() => {
      const deltaWidth = event.delta.width;
      if (deltaWidth === undefined || event.width === undefined) {
        console.log('no deltaWidth');
        return;
      }

      if (event.horizontalPositiveDeltaDirection === 'left') {
        setX(initialStyle.x - deltaWidth);
        setWidth(initialStyle.width + deltaWidth);
        console.log('left', initialStyle.x, deltaWidth);
        return;
      }
      if (event.horizontalPositiveDeltaDirection === 'right') {
        setWidth(initialStyle.width + deltaWidth);
        console.log('right', initialStyle.width, deltaWidth);
      }
    })();
    (() => {
      const deltaHeight = event.delta.height;
      if (deltaHeight === undefined || event.height === undefined) {
        console.log('no deltaHeight');
        return;
      }

      if (event.verticalPositiveDeltaDirection === 'top') {
        setY(initialStyle.y - deltaHeight);
        setHeight(initialStyle.height + deltaHeight);
        console.log('top', initialStyle.y, deltaHeight);
        return;
      }
      if (event.verticalPositiveDeltaDirection === 'bottom') {
        setHeight(initialStyle.height + deltaHeight);
        console.log('bottom', initialStyle.height, deltaHeight);
      }
    })();
  };

  const frameRef = useRef<HTMLDivElement>(null);

  const handleResizeStart: WindowResizeHandlerBaseProps['onResizeStart'] =
    () => {
      initialStyleRef.current = {
        x,
        y,
        width,
        height,
      };
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
