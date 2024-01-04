import { useWindowsStore } from './useWindowsStore.ts';

export function useFocusedWindowID() {
  return useWindowsStore((state) => state.focusedWindowID);
}
