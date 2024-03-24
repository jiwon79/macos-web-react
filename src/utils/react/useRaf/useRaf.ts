import { useEffect, useRef } from 'react';
import { usePreservedCallback } from '../usePreservedCallback';

interface UseRequestAnimationFrameOptions {
  enabled?: boolean;
}

export function useRaf(
  callback: FrameRequestCallback,
  { enabled = true }: UseRequestAnimationFrameOptions = {}
) {
  const preservedCallback = usePreservedCallback(callback);
  const frameIDRef = useRef<number>();
  const cancel = () => {
    if (frameIDRef.current !== undefined) {
      cancelAnimationFrame(frameIDRef.current);
    }
  };

  useEffect(() => {
    if (!enabled) {
      cancel();
      return undefined;
    }

    const loop: FrameRequestCallback = (time) => {
      preservedCallback(time);
      frameIDRef.current = requestAnimationFrame(loop);
    };

    frameIDRef.current = requestAnimationFrame(loop);
    return () => cancel();
  }, [enabled, preservedCallback]);
}
