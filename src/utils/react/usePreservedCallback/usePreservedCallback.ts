import { useCallback, useEffect, useRef } from "react";

// biome-ignore lint/suspicious/noExplicitAny: any
export function usePreservedCallback<Callback extends (...args: any[]) => any>(
  callback: Callback
) {
  const callbackRef = useRef<Callback>(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: dynamic dependency array
  return useCallback(
    (...args: unknown[]) => {
      return callbackRef.current(...args);
    },
    [callbackRef]
  ) as Callback;
}
