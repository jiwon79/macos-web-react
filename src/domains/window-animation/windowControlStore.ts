import { MinimizedWindow } from 'domains/window/interface';
import { create } from 'third-parties/zustand';

export interface WindowControlState {
  minimizingWindows: MinimizedWindow[];
  minimizedDockIndicatorRef: HTMLDivElement | null;
}

export interface WindowControlAction {
  startMinimizingWindow: (window: MinimizedWindow) => void;
  stopMinimizingWindow: (id: string) => void;
  setMinimizedDockIndicatorRef: (ref: HTMLDivElement) => void;
}

export const useWindowControlStore = create<
  WindowControlState,
  WindowControlAction
>((set) => ({
  minimizingWindows: [],
  minimizedDockIndicatorRef: null,
  actions: {
    startMinimizingWindow: (window: MinimizedWindow) => {
      set((state) => ({
        minimizingWindows: [...state.minimizingWindows, window],
      }));
    },
    stopMinimizingWindow: (id: string) => {
      set((state) => ({
        minimizingWindows: state.minimizingWindows.filter(
          (window) => window.id !== id
        ),
      }));
    },
    setMinimizedDockIndicatorRef: (ref: HTMLDivElement) => {
      set({ minimizedDockIndicatorRef: ref });
    },
  },
}));

export function useWindowControlAction() {
  return useWindowControlStore((state) => state.actions);
}
