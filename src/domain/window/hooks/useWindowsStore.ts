import { create } from '../../../third-parties/zustand';
import { initialWindowStates } from './initialWindowStatesXX.tsx';
import { WindowsAction, WindowsState } from '../interface/WindowsStore.ts';
import { deepMergeObject } from '../../../utils/object/deepMergeObject.ts';
import { WindowState, WindowStyle } from '../interface/WindowState.ts';

const initialWindowsState = {
  windows: initialWindowStates,
  focusedWindowID: undefined,
};

export const useWindowsStore = create<WindowsState, WindowsAction>((set) => ({
  ...initialWindowsState,
  actions: {
    setFocusedWindowID: (id: string) => set({ focusedWindowID: id }),
    addWindow: (window) =>
      set((state) => ({ windows: [...state.windows, window] })),
    removeWindow: (id) =>
      set((state) => ({
        windows: state.windows.filter((window) => window.id !== id),
      })),
    updateWindow: (id, data) => {
      console.log('updateWindow', id, data);
      set((state) => ({
        windows: state.windows.map((window) =>
          window.id === id ? deepMergeObject(window, data) : window
        ),
      }));
    },
  },
}));
