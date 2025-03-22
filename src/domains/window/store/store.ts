import { ApplicationID, applications } from 'domains/app/applications';
import { create } from 'third-parties/zustand';
import { uniq } from 'utils/array/uniq';
import { deepMergeObject } from 'utils/object';
import { DeepPartial } from 'utils/type';
import { WindowState } from '../interface/index';
import { initialWindowStates } from './initialWindowStatesXX';

export interface WindowsState {
  windows: WindowState[];
  minimizedWindowIds: string[];
  focusedWindowID: string | null;
}

export interface WindowsAction {
  setFocusedWindowID: (id: string | null) => void;
  openApplication: (appID: ApplicationID) => void;
  addWindow: (window: WindowState) => void;
  removeWindow: (id: string) => void;
  updateWindow: (id: string, data: DeepPartial<WindowState>) => void;
  minimizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
}

export const useWindowsStore = create<WindowsState, WindowsAction>((set) => ({
  windows: initialWindowStates,
  minimizedWindowIds: [],
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

        const focusedWindow = state.windows[index];

        return {
          focusedWindowID: id,
          windows: [
            ...state.windows.slice(0, index),
            ...state.windows.slice(index + 1),
            focusedWindow,
          ],
        };
      }),

    openApplication: (appID) =>
      set((state) => {
        const app = applications[appID];
        if (app == null) {
          return state;
        }

        const window: WindowState = {
          appID,
          id: self.crypto.randomUUID(),
          content: app.app(),
          style: {
            x: app.initialStyle.x ?? 100,
            y: app.initialStyle.y ?? 100,
            width: app.initialStyle.width,
            height: app.initialStyle.height,
          },
        };

        return { windows: [...state.windows, window] };
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

    minimizeWindow: (id) =>
      set((state) => ({
        minimizedWindowIds: uniq([...state.minimizedWindowIds, id]),
      })),

    restoreWindow: (id) =>
      set((state) => ({
        minimizedWindowIds: state.minimizedWindowIds.filter(
          (minimizedId) => minimizedId !== id
        ),
      })),
  },
}));

export function useMinimizedWindowIds() {
  return useWindowsStore((state) => state.minimizedWindowIds);
}

export function useWindowsAction() {
  return useWindowsStore((state) => state.actions);
}
