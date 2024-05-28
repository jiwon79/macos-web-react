import { useWindowsStore } from '.';

export function useFocusedWindowID() {
  return useWindowsStore((state) => state.focusedWindowID);
}

export function useWindows() {
  return useWindowsStore((state) => state.windows);
}

export function useFocusedWindow() {
  return useWindowsStore((state) => {
    const focusedWindowID = state.focusedWindowID;
    return state.windows.find((window) => window.id === focusedWindowID);
  });
}
