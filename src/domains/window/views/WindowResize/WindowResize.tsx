import type { WindowStyle } from "domains/window/interface";
import type { ResizableEventMap } from "modules/resizable/interfaces";
import { MultiDirectionResizableContainer } from "modules/resizable-react";
import type { ResizeHandlerBaseProps } from "modules/resizable-react/interfaces";
import { useRef } from "react";
import { useWindowContext } from "../WindowContext";

interface WindowResizeProps {
  children?: React.ReactNode;
}

export function WindowResize({ children }: WindowResizeProps) {
  const { style, onStyleChange } = useWindowContext();
  const initialStyleRef = useRef<WindowStyle | undefined>(undefined);

  const handleResize = (event: ResizableEventMap["resize"]) => {
    const initialStyle = initialStyleRef.current;
    if (initialStyle === undefined) {
      return;
    }
    (() => {
      const deltaWidth = event.delta.width;
      if (deltaWidth === undefined || event.width === undefined) {
        return;
      }

      if (event.horizontalPositiveDeltaDirection === "left") {
        onStyleChange({
          x: initialStyle.x - deltaWidth,
          width: initialStyle.width + deltaWidth
        });
        return;
      }
      if (event.horizontalPositiveDeltaDirection === "right") {
        onStyleChange({
          width: initialStyle.width + deltaWidth
        });
      }
    })();
    (() => {
      const deltaHeight = event.delta.height;
      if (deltaHeight === undefined || event.height === undefined) {
        return;
      }

      if (event.verticalPositiveDeltaDirection === "top") {
        onStyleChange({
          y: initialStyle.y - deltaHeight,
          height: initialStyle.height + deltaHeight
        });
        return;
      }
      if (event.verticalPositiveDeltaDirection === "bottom") {
        onStyleChange({
          height: initialStyle.height + deltaHeight
        });
      }
    })();
  };

  const handleResizeStart: ResizeHandlerBaseProps["onResizeStart"] = () => {
    initialStyleRef.current = style;
  };

  const handleResizeEnd: ResizeHandlerBaseProps["onResizeEnd"] = () => {
    initialStyleRef.current = undefined;
  };

  return (
    <MultiDirectionResizableContainer
      onResize={handleResize}
      onResizeStart={handleResizeStart}
      onResizeEnd={handleResizeEnd}
    >
      {children}
    </MultiDirectionResizableContainer>
  );
}
