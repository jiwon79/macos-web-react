import { create } from 'third-parties/zustand';
import { deepMergeObject } from 'utils/object';
import { initialWindowStates } from './initialWindowStatesXX.tsx';
import { WindowState } from '../interface/index.ts';
import { DeepPartial } from 'utils/type';

export interface WindowsState {
  windows: WindowState[];
  focusedWindowID: string | null;
}

export interface WindowsAction {
  setFocusedWindowID: (id: string | null) => void;
  addWindow: (window: WindowState) => void;
  removeWindow: (id: string) => void;
  updateWindow: (id: string, data: DeepPartial<WindowState>) => void;
}

export const useWindowsStore = create<WindowsState, WindowsAction>((set) => ({
  windows: initialWindowStates,
  focusedWindowID: null,
  actions: {
    setFocusedWindowID: (id: string | null) =>
      set((state) => {
        if (id === null) {
          return { focusedWindowID: id, windows: state.windows };
        }

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

export function useWindowsAction<
  TAction extends WindowsAction[keyof WindowsAction],
>(selector: (action: WindowsAction) => TAction): TAction {
  return useWindowsStore((state) => selector(state.actions));
}
