import { ApplicationID, applications } from 'domains/app/applications';
import { create } from 'third-parties/zustand';
import { uniqBy } from 'utils/array/uniqBy';
import { deepMergeObject } from 'utils/object';
import { DeepPartial } from 'utils/type';
import { MinimizedWindow, Window } from '../interface';
import { initialWindowStates } from './initialWindowStatesXX';

export interface WindowsState {
  windows: Window[];
  windowElements: Record<string, HTMLDivElement>;
  minimizedWindows: MinimizedWindow[];
  focusedWindowID: string | null;
}

export interface WindowsAction {
  setFocusedWindowID: (id: string | null) => void;
  createAppWindow: (appID: ApplicationID) => void;
  updateWindow: (id: string, data: DeepPartial<Window>) => void;
  deleteWindow: (id: string) => void;
  setWindowRef: (id: string, element: HTMLDivElement) => void;

  minimizeWindow: (window: MinimizedWindow) => void;
  restoreMinimizedWindow: (id: string) => void;
}

export const useWindowsStore = create<WindowsState, WindowsAction>((set) => ({
  windows: initialWindowStates,
  windowElements: {},
  minimizedWindows: [],
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
    createAppWindow: (appID) =>
      set((state) => {
        const app = applications[appID];
        if (app == null) {
          return state;
        }

        const window: Window = {
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
    updateWindow: (id, data) => {
      set((state) => ({
        windows: state.windows.map((window) =>
          window.id === id ? deepMergeObject(window, data) : window
        ),
      }));
    },
    deleteWindow: (id) =>
      set((state) => ({
        windows: state.windows.filter((window) => window.id !== id),
      })),
    setWindowRef: (id, element) =>
      set((state) => ({
        windowElements: { ...state.windowElements, [id]: element },
      })),
    minimizeWindow: (window) =>
      set((state) => ({
        minimizedWindows: uniqBy(
          [...state.minimizedWindows, window],
          (window) => window.id
        ),
      })),
    restoreMinimizedWindow: (id) =>
      set((state) => ({
        minimizedWindows: state.minimizedWindows.filter(
          (minimizedWindow) => minimizedWindow.id !== id
        ),
      })),
  },
}));

export function useWindowsAction() {
  return useWindowsStore((state) => state.actions);
}
