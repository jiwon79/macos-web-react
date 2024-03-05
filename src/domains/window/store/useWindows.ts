import { useWindowsStore } from './useWindowsStore.ts';

export function useWindows() {
  return useWindowsStore((state) => state.windows);
}
