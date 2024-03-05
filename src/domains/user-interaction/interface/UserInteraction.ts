export interface UserInteractionState {
  isDragging: boolean;
  mousePosition: { x: number; y: number };
}

export interface UserInteractionActions {
  startDragging: () => void;
  endDragging: () => void;
  setMousePosition: (x: number, y: number) => void;
}
