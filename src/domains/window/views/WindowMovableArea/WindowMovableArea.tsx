import type { MovableEventMap } from "modules/movable";
import { MovableContainer } from "modules/movable-react";
import { useRef } from "react";
import { cn } from "third-parties/classnames";
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

  const initialPosition = useRef<{ x: number; y: number }>();

  const onStartMove = () => {
    initialPosition.current = { x: style.x, y: style.y };
  };

  const monMove = (event: MovableEventMap["move"]) => {
    if (!initialPosition.current) {
      return;
    }
    onStyleChange({
      x: initialPosition.current.x + event.delta.x,
      y: initialPosition.current.y + event.delta.y
    });
  };

  return (
    <MovableContainer
      className={cn(container, className)}
      onStartMove={onStartMove}
      onMove={monMove}
    >
      {children}
    </MovableContainer>
  );
}
