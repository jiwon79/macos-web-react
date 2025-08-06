import { useCallback } from "react";
import { mergeRefs } from "./mergeRefs";

export function useMergedRefs<T>(
  ...refs: Array<React.MutableRefObject<T> | React.LegacyRef<T>>
): React.RefCallback<T> {
  return useCallback((value) => mergeRefs(refs)(value), [refs]);
}
