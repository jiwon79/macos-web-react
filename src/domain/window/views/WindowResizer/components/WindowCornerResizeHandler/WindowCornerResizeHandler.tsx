import { useRef } from 'react';
import { WindowResizeHandlerBase } from '../WindowResizeHandlerBase';
import { type WindowResizeHandler } from '../../interfaces';
import { mergeRefs } from '../../../../../../utils/react';
import { point } from './WindowCornerResizeHandler.css';

const directionsByPosition = {
  'top-left': {
    vertical: 'top',
    horizontal: 'left',
  },
  'top-right': {
    vertical: 'top',
    horizontal: 'right',
  },
  'bottom-left': {
    vertical: 'bottom',
    horizontal: 'left',
  },
  'bottom-right': {
    vertical: 'bottom',
    horizontal: 'right',
  },
} as const;

export type WindowCornerResizeHandlerPosition =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';

export const WindowCornerResizeHandler: WindowResizeHandler<{
  position: WindowCornerResizeHandlerPosition;
}> = ({
  position,
  frameRef,
  onResize,
  onResizeStart,
  onResizeEnd,
  className,
}) => {
  const pointRef = useRef<HTMLDivElement>(null);
  return (
    <WindowResizeHandlerBase
      frameRef={frameRef}
      onResize={onResize}
      onResizeStart={onResizeStart}
      onResizeEnd={onResizeEnd}
      className={className}
      horizontalPositiveDeltaDirection={
        directionsByPosition[position].horizontal
      }
      verticalPositiveDeltaDirection={directionsByPosition[position].vertical}
      // keepRatio={isShiftKey}
    >
      {(ref, { className, ...restProps }) => (
        <div
          className={point({ position }) + ' ' + className}
          ref={mergeRefs([ref, pointRef])}
          {...restProps}
        />
      )}
    </WindowResizeHandlerBase>
  );
};
