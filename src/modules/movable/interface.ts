export interface MovableMoveEvent {
  nativeEvent: MouseEvent;
  delta: {
    x: number;
    y: number;
  };
}

export interface MovableStartMoveEvent {
  nativeEvent: MouseEvent;
}

export interface MovableEndMoveEvent {
  nativeEvent: MouseEvent;
}

export type MovableEventMap = {
  move: MovableMoveEvent;
  startMove: MovableStartMoveEvent;
  endMove: MovableEndMoveEvent;
};
