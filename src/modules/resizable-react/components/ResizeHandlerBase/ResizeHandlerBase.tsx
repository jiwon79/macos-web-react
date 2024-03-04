import { Resizable } from 'modules/resizable';
import { ResizeHandler } from 'modules/resizable-react/interfaces';
import { HTMLProps, ReactNode, Ref, useEffect, useRef } from 'react';
import { usePreservedCallback } from 'utils/react';

const noop = () => {};

export const ResizeHandlerBase: ResizeHandler<{
  horizontalPositiveDeltaDirection?: 'left' | 'right';
  verticalPositiveDeltaDirection?: 'top' | 'bottom';
  keepRatio?: boolean;
  children: (
    ref: Ref<HTMLDivElement>,
    restProps: HTMLProps<HTMLDivElement>
  ) => ReactNode;
}> = ({
  horizontalPositiveDeltaDirection,
  verticalPositiveDeltaDirection,
  keepRatio,
  children,
  frameRef,
  onResize,
  onResizeStart,
  onResizeEnd,
  ...restProps
}) => {
  const handlerRef = useRef<HTMLDivElement>(null);
  const resizableRef = useRef<Resizable | null>(null);

  const onResizePreserved = usePreservedCallback(onResize ?? noop);
  const onResizeStartPreserved = usePreservedCallback(onResizeStart ?? noop);
  const onResizeEndPreserved = usePreservedCallback(onResizeEnd ?? noop);

  useEffect(() => {
    resizableRef.current?.updateOptions({
      keepRatio,
    });
  }, [keepRatio]);

  useEffect(() => {
    if (frameRef.current == null || handlerRef.current == null) {
      return;
    }

    resizableRef.current = new Resizable(frameRef.current, handlerRef.current, {
      horizontalPositiveDeltaDirection,
      verticalPositiveDeltaDirection,
      keepRatio,
    });

    resizableRef.current.on('startResize', () => {
      onResizeStartPreserved();
    });
    resizableRef.current.on('resize', (event) => {
      onResizePreserved(event);
    });
    resizableRef.current.on('endResize', () => {
      onResizeEndPreserved();
    });

    return () => {
      resizableRef.current?.destroy();
      resizableRef.current = null;
    };
  }, [
    frameRef,
    onResizeEndPreserved,
    onResizePreserved,
    onResizeStartPreserved,
  ]);

  return children(handlerRef, restProps);
};
