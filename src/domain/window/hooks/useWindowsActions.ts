import { useWindowsStore } from './useWindowsStore.ts';

export function useWindowsActions() {
  return useWindowsStore((state) => state.actions);
}
