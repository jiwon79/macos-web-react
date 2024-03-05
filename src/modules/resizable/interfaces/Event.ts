export interface ResizableResizeEvent {
  nativeEvent: MouseEvent;
  width?: number;
  height?: number;
  horizontalPositiveDeltaDirection: 'left' | 'right';
  verticalPositiveDeltaDirection: 'top' | 'bottom';
  delta: {
    width?: number;
    height?: number;
  };
}

export interface ResizableStartResizeEvent {
  nativeEvent: MouseEvent;
}

export interface ResizableEndResizeEvent {
  nativeEvent: MouseEvent;
}

export type ResizableEventByType = {
  resize: ResizableResizeEvent;
  startResize: ResizableStartResizeEvent;
  endResize: ResizableEndResizeEvent;
};

export type ResizableEventType = keyof ResizableEventByType;

export type ResizableEvent = ResizableEventByType[ResizableEventType];

export type ResizableEventListener<K extends ResizableEventType> = (
  e: ResizableEventByType[K]
) => void;
