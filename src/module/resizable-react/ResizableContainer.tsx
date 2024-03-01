import { useEffect, useRef } from 'react';

import { usePreservedCallback } from '../../utils/react';
import {
  ResizableResizeEvent,
  ResizableOptions,
  Resizable,
} from '../resizable';

interface Props {
  onResize?: (event: ResizableResizeEvent) => void;
  options: Partial<ResizableOptions>;
  children: (
    targetRef: React.RefObject<any>,
    handlerRef: React.RefObject<any>
  ) => React.ReactNode;
}

export const ResizableContainer = ({ onResize, options, children }: Props) => {
  const resizable = useRef<Resizable>();

  const targetRef = useRef<HTMLElement>(null);
  const handlerRef = useRef<HTMLElement>(null);

  const preservedOnResize = usePreservedCallback(onResize ?? (() => {}));
  const preservedCanResize = usePreservedCallback(
    options?.canResize ?? (() => true)
  );
  const preservedShouldStartResize = usePreservedCallback(
    options?.shouldStartResize ?? (() => true)
  );
  const preservedOptions = useRef<Partial<ResizableOptions>>(options);
  preservedOptions.current = options;

  useEffect(() => {
    if (!targetRef.current || !handlerRef.current) {
      return;
    }

    resizable.current = new Resizable(targetRef.current, handlerRef.current, {
      ...preservedOptions.current,
      canResize: preservedCanResize,
      shouldStartResize: preservedShouldStartResize,
    });

    resizable.current.on('resize', preservedOnResize);

    return () => {
      resizable.current?.destroy();
    };
  }, [
    preservedOptions,
    preservedCanResize,
    preservedOnResize,
    preservedShouldStartResize,
  ]);

  return <>{children(targetRef, handlerRef)}</>;
};
