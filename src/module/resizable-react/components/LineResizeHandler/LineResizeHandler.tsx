import { useRef } from 'react';
import { ResizeHandlerBase } from '../ResizeHandlerBase';
import {
  LineResizeHandlerPosition,
  type ResizeHandler,
} from '../../interfaces';
import { mergeRefs, usePreservedCallback } from '../../../../utils/react';
import { ResizableResizeEvent } from '../../../resizable';
import { line } from './LineResizeHandler.css';
import { cn } from '../../../../third-parties/classnames';

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

export const LineResizeHandler: ResizeHandler<{
  position: LineResizeHandlerPosition;
  classNameByPosition?: (variants: {
    position: LineResizeHandlerPosition | undefined;
  }) => string;
}> = ({
  frameRef,
  onResize,
  onResizeStart,
  onResizeEnd,
  position,
  classNameByPosition,
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
    <ResizeHandlerBase
      frameRef={frameRef}
      onResize={handleResizeByDirection}
      onResizeStart={onResizeStart}
      onResizeEnd={onResizeEnd}
      horizontalPositiveDeltaDirection={
        directionsByPosition[position].horizontal
      }
      verticalPositiveDeltaDirection={directionsByPosition[position].vertical}
    >
      {(ref, { className, ...restProps }) => (
        <div
          className={cn(
            line({ position }),
            classNameByPosition?.({ position }),
            className
          )}
          ref={mergeRefs([ref, lineRef])}
          {...restProps}
        />
      )}
    </ResizeHandlerBase>
  );
};
