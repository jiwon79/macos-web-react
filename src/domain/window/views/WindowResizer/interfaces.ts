import type { ComponentType, HTMLProps, RefObject } from 'react';
import { ResizableResizeEvent } from '../../../../module/resizable';

export type WindowResizeHandler<Props = unknown> = ComponentType<
  WindowResizeHandlerBaseProps &
    Omit<HTMLProps<HTMLDivElement>, 'children' | 'ref' | 'onResize'> &
    Props
>;

export type WindowResizeHandlerBaseProps = {
  frameRef: RefObject<HTMLDivElement>;
  className?: string;
  onResizeStart?: () => void;
  onResize?: (event: ResizableResizeEvent) => void;
  onResizeEnd?: () => void;
};
