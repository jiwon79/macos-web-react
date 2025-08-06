import type { ResizableResizeEvent } from "modules/resizable";
import { useRef } from "react";
import { cn } from "third-parties/classnames";
import { mergeRefs, usePreservedCallback } from "utils/react";
import type {
  LineResizeHandlerPosition,
  ResizeHandler
} from "../../interfaces";
import { ResizeHandlerBase } from "../ResizeHandlerBase";
import { line } from "./LineResizeHandler.css";

const directionsByPosition = {
  top: {
    horizontal: undefined,
    vertical: "top"
  },
  bottom: {
    horizontal: undefined,
    vertical: "bottom"
  },
  left: {
    horizontal: "left",
    vertical: undefined
  },
  right: {
    horizontal: "right",
    vertical: undefined
  }
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
  classNameByPosition
}) => {
  const lineRef = useRef<HTMLDivElement>(null);

  const handleResizeByDirection = usePreservedCallback(
    (event: ResizableResizeEvent) => {
      if (position === "top" || position === "bottom") {
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
