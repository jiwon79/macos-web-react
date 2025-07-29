import { ApplicationID, applications } from 'domains/app/applications';
import { create } from 'third-parties/zustand';
import { uniqBy } from 'utils/array/uniqBy';
import { deepMergeObject } from 'utils/object';
import { DeepPartial } from 'utils/type';
import { WindowState } from '../interface/index';
import { initialWindowStates } from './initialWindowStatesXX';

interface MinimizedWindow {
  id: string;
  image: string;
}

export interface WindowsState {
  windows: WindowState[];
  windowElements: Record<string, HTMLDivElement>;
  minimizedWindows: MinimizedWindow[];
  minimizingWindows: MinimizedWindow[];
  focusedWindowID: string | null;
  minimizedDockIndicatorRef: HTMLDivElement | null;
}

export interface WindowsAction {
  setFocusedWindowID: (id: string | null) => void;
  openApplication: (appID: ApplicationID) => void;
  addWindow: (window: WindowState) => void;
  removeWindow: (id: string) => void;
  updateWindow: (id: string, data: DeepPartial<WindowState>) => void;
  setWindowRef: (id: string, element: HTMLDivElement) => void;

  minimizeWindow: (window: MinimizedWindow) => void;
  restoreMinimizedWindow: (id: string) => void;
  startMinimizingWindow: (window: MinimizedWindow) => void;
  stopMinimizingWindow: (id: string) => void;
  setMinimizedDockIndicatorRef: (ref: HTMLDivElement) => void;
}

export const useWindowsStore = create<WindowsState, WindowsAction>((set) => ({
  windows: initialWindowStates,
  windowElements: {},
  minimizedWindows: [],
  minimizingWindows: [],
  focusedWindowID: null,
  minimizedDockIndicatorRef: null,
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
    startMinimizingWindow: (window) =>
      set((state) => ({
        minimizingWindows: uniqBy(
          [...state.minimizingWindows, window],
          (window) => window.id
        ),
      })),
    stopMinimizingWindow: (id) =>
      set((state) => ({
        minimizingWindows: state.minimizingWindows.filter(
          (minimizingWindow) => minimizingWindow.id !== id
        ),
      })),
    restoreMinimizedWindow: (id) =>
      set((state) => ({
        minimizedWindows: state.minimizedWindows.filter(
          (minimizedWindow) => minimizedWindow.id !== id
        ),
      })),
    setMinimizedDockIndicatorRef: (ref) =>
      set({ minimizedDockIndicatorRef: ref }),
  },
}));

export function useWindowsAction() {
  return useWindowsStore((state) => state.actions);
}
