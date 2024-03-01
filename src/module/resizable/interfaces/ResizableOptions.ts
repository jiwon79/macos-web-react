import { ResizableResizeEvent, ResizableStartResizeEvent } from './Event';

export interface ResizableOptions {
  maxWidth?: number;
  maxHeight?: number;
  minWidth?: number;
  minHeight?: number;
  shouldStartResize?: (e: ResizableStartResizeEvent) => boolean;
  canResize?: (e: ResizableResizeEvent) => boolean;
  verticalPositiveDeltaDirection: 'top' | 'bottom';
  horizontalPositiveDeltaDirection: 'left' | 'right';
}
