import type { ComponentType, HTMLProps, RefObject } from "react";
import type { ResizableResizeEvent } from "../resizable";

export type LineResizeHandlerPosition = "top" | "bottom" | "left" | "right";

export type CornerResizeHandlerPosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

export type ResizeHandler<Props = unknown> = ComponentType<
  ResizeHandlerBaseProps &
    Omit<HTMLProps<HTMLDivElement>, "children" | "ref" | "onResize"> &
    Props
>;

export type ResizeHandlerBaseProps = {
  frameRef: RefObject<HTMLDivElement>;
  onResizeStart?: () => void;
  onResize?: (event: ResizableResizeEvent) => void;
  onResizeEnd?: () => void;
};
