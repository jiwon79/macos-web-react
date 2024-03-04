import { useRef } from 'react';
import { useWindowContext } from '..';
import { ResizableEventByType } from '../../../../module/resizable/interfaces';
import { WindowStyle } from '../../interface';
import { ResizeHandlerBaseProps } from '../../../../module/resizable-react/interfaces';
import { MultiDirectionResizableContainer } from '../../../../module/resizable-react';

interface WindowResizeProps {
  children?: React.ReactNode;
}

export function WindowResize({ children }: WindowResizeProps) {
  const { style, onStyleChange } = useWindowContext();
  const initialStyleRef = useRef<WindowStyle | undefined>(undefined);

  const handleResize = (event: ResizableEventByType['resize']) => {
    const initialStyle = initialStyleRef.current;
    if (initialStyle === undefined) {
      return;
    }
    (() => {
      const deltaWidth = event.delta.width;
      if (deltaWidth === undefined || event.width === undefined) {
        return;
      }

      if (event.horizontalPositiveDeltaDirection === 'left') {
        onStyleChange({
          x: initialStyle.x - deltaWidth,
          width: initialStyle.width + deltaWidth,
        });
        return;
      }
      if (event.horizontalPositiveDeltaDirection === 'right') {
        onStyleChange({
          width: initialStyle.width + deltaWidth,
        });
      }
    })();
    (() => {
      const deltaHeight = event.delta.height;
      if (deltaHeight === undefined || event.height === undefined) {
        return;
      }

      if (event.verticalPositiveDeltaDirection === 'top') {
        onStyleChange({
          y: initialStyle.y - deltaHeight,
          height: initialStyle.height + deltaHeight,
        });
        return;
      }
      if (event.verticalPositiveDeltaDirection === 'bottom') {
        onStyleChange({
          height: initialStyle.height + deltaHeight,
        });
      }
    })();
  };

  const handleResizeStart: ResizeHandlerBaseProps['onResizeStart'] = () => {
    initialStyleRef.current = style;
  };

  const handleResizeEnd: ResizeHandlerBaseProps['onResizeEnd'] = () => {
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
