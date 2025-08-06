import { useWindowsStore } from ".";

export function useFocusedWindow() {
  return useWindowsStore((state) => {
    const focusedWindowID = state.focusedWindowID;
    return state.windows.find((window) => window.id === focusedWindowID);
  });
}
