import { useRef } from 'react';
import { ResizeHandlerBase } from '../ResizeHandlerBase';
import {
  CornerResizeHandlerPosition,
  type ResizeHandler,
} from '../../interfaces';
import { mergeRefs } from '../../../../utils/react';
import { point } from './CornerResizeHandler.css';
import { cn } from '../../../../third-parties/classnames';

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

export const CornerResizeHandler: ResizeHandler<{
  position: CornerResizeHandlerPosition;
  classNameByPosition?: (variants: {
    position: CornerResizeHandlerPosition | undefined;
  }) => string;
  keepRatio?: boolean;
}> = ({
  position,
  frameRef,
  onResize,
  onResizeStart,
  onResizeEnd,
  classNameByPosition,
  keepRatio,
}) => {
  const pointRef = useRef<HTMLDivElement>(null);
  return (
    <ResizeHandlerBase
      frameRef={frameRef}
      onResize={onResize}
      onResizeStart={onResizeStart}
      onResizeEnd={onResizeEnd}
      horizontalPositiveDeltaDirection={
        directionsByPosition[position].horizontal
      }
      verticalPositiveDeltaDirection={directionsByPosition[position].vertical}
      keepRatio={keepRatio}
    >
      {(ref, { className, ...restProps }) => (
        <div
          className={cn(
            point({ position }),
            classNameByPosition?.({ position })
          )}
          ref={mergeRefs([ref, pointRef])}
          {...restProps}
        />
      )}
    </ResizeHandlerBase>
  );
};
