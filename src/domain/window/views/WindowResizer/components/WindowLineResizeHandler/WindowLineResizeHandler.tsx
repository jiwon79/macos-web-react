import { useRef } from 'react';
import { WindowResizeHandlerBase } from '../WindowResizeHandlerBase';
import { type WindowResizeHandler } from '../../interfaces';
import { mergeRefs, usePreservedCallback } from '../../../../../../utils/react';
import { ResizableResizeEvent } from '../../../../../../module/resizable';
import { line } from './WindowLineResizeHandler.css';

const directionsByPosition = {
  top: {
    horizontal: undefined,
    vertical: 'top',
  },
  bottom: {
    horizontal: undefined,
    vertical: 'bottom',
  },
  left: {
    horizontal: 'left',
    vertical: undefined,
  },
  right: {
    horizontal: 'right',
    vertical: undefined,
  },
} as const;

export type WindowLineResizeHandlerPosition =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right';

export const WindowLineResizeHandler: WindowResizeHandler<{
  position: WindowLineResizeHandlerPosition;
}> = ({
  frameRef,
  onResize,
  onResizeStart,
  onResizeEnd,
  position,
  className,
}) => {
  const lineRef = useRef<HTMLDivElement>(null);

  const handleResizeByDirection = usePreservedCallback(
    (event: ResizableResizeEvent) => {
      if (position === 'top' || position === 'bottom') {
        onResize?.({ ...event, width: undefined });
      } else {
        onResize?.({ ...event, height: undefined });
      }
    }
  );

  return (
    <WindowResizeHandlerBase
      frameRef={frameRef}
      onResize={handleResizeByDirection}
      onResizeStart={onResizeStart}
      onResizeEnd={onResizeEnd}
      className={className}
      horizontalPositiveDeltaDirection={
        directionsByPosition[position].horizontal
      }
      verticalPositiveDeltaDirection={directionsByPosition[position].vertical}
    >
      {(ref, { className, ...restProps }) => (
        <div
          className={line({ position }) + ' ' + className}
          ref={mergeRefs([ref, lineRef])}
          {...restProps}
        />
      )}
    </WindowResizeHandlerBase>
  );
};
