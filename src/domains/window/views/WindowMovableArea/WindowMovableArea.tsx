import type { MovableEventMap } from "modules/movable";
import { MovableContainer } from "modules/movable-react";
import { useRef } from "react";
import { cn } from "third-parties/classnames";
import { clamp } from "utils/math/clamp.ts";
import { useWindowsAction } from "../../store/store";
import { useWindowContext } from "../WindowContext.ts";
import { container } from "./WindowMovableArea.css.ts";

interface WindowMovableAreaProps {
  children?: React.ReactNode;
  className?: string;
}

export function WindowMovableArea({
  children,
  className
}: WindowMovableAreaProps) {
  const { style, onStyleChange } = useWindowContext();
  const { setIsDraggingWindow } = useWindowsAction();

  const initialPositionRef = useRef<{ x: number; y: number }>();
  const initialMousePositionRef = useRef<{ x: number; y: number }>();

  const onStartMove = (event: MovableEventMap["startMove"]) => {
    initialPositionRef.current = { x: style.x, y: style.y };
    initialMousePositionRef.current = {
      x: event.nativeEvent.clientX,
      y: event.nativeEvent.clientY
    };
    setIsDraggingWindow(true);
  };

  const onMove = (event: MovableEventMap["move"]) => {
    const initialPosition = initialPositionRef.current;
    const initialMousePosition = initialMousePositionRef.current;

    if (!initialPosition || !initialMousePosition) {
      return;
    }

    const initialOffset = {
      x: initialMousePosition.x - initialPosition.x,
      y: initialMousePosition.y - initialPosition.y
    };

    const LEFT_MOUSE_LIMIT = 0;
    const RIGHT_MOUSE_LIMIT = window.innerWidth;
    const TOP_LIMIT = 24;
    const BOTTOM_MOUSE_LIMIT = window.innerHeight;

    const newX = clamp(
      initialPosition.x + event.delta.x,
      LEFT_MOUSE_LIMIT - initialOffset.x,
      RIGHT_MOUSE_LIMIT - initialOffset.x
    );
    const newY = clamp(
      initialPosition.y + event.delta.y,
      TOP_LIMIT,
      BOTTOM_MOUSE_LIMIT - initialOffset.y
    );

    onStyleChange({
      x: newX,
      y: newY
    });
  };

  const onEndMove = () => {
    setIsDraggingWindow(false);
  };

  return (
    <MovableContainer
      className={cn(container, className)}
      onStartMove={onStartMove}
      onMove={onMove}
      onEndMove={onEndMove}
    >
      {children}
    </MovableContainer>
  );
}
