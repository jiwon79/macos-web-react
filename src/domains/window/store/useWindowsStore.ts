import { create } from 'third-parties/zustand';
import { deepMergeObject } from 'utils/object';
import { WindowsAction, WindowsState } from '../interface/WindowsStore.ts';
import { initialWindowStates } from './initialWindowStatesXX.tsx';

const initialWindowsState = {
  windows: initialWindowStates,
  focusedWindowID: undefined,
};

export const useWindowsStore = create<WindowsState, WindowsAction>((set) => ({
  ...initialWindowsState,
  actions: {
    setFocusedWindowID: (id: string) =>
      set((state) => {
        const index = state.windows.findIndex((window) => window.id === id);
        if (index === -1) {
          return state;
        }
        const focusedWdindow = state.windows[index];
        return {
          focusedWindowID: id,
          windows: [
            ...state.windows.slice(0, index),
            ...state.windows.slice(index + 1),
            focusedWdindow,
          ],
        };
      }),
    addWindow: (window) =>
      set((state) => ({ windows: [...state.windows, window] })),
    removeWindow: (id) =>
      set((state) => ({
        windows: state.windows.filter((window) => window.id !== id),
      })),
    updateWindow: (id, data) => {
      set((state) => ({
        windows: state.windows.map((window) =>
          window.id === id ? deepMergeObject(window, data) : window
        ),
      }));
    },
  },
}));
