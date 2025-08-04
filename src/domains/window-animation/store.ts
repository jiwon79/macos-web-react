import { MinimizedWindow } from 'domains/window/interface';
import { create } from 'third-parties/zustand';

export interface WindowAnimationState {
  minimizingWindows: MinimizedWindow[];
  maximizingWindows: MinimizedWindow[];
  minimizedDockIndicatorRef: HTMLDivElement | null;
}

export interface WindowAnimationAction {
  startMinimizingWindow: (window: MinimizedWindow) => void;
  stopMinimizingWindow: (id: string) => void;
  startMaximizingWindow: (window: MinimizedWindow) => void;
  stopMaximizingWindow: (id: string) => void;
  setMinimizedDockIndicatorRef: (ref: HTMLDivElement) => void;
}

export const useWindowAnimationStore = create<
  WindowAnimationState,
  WindowAnimationAction
>((set) => ({
  minimizingWindows: [],
  maximizingWindows: [],
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
    startMaximizingWindow: (window: MinimizedWindow) => {
      set((state) => ({
        maximizingWindows: [...state.maximizingWindows, window],
      }));
    },
    stopMaximizingWindow: (id: string) => {
      set((state) => ({
        maximizingWindows: state.maximizingWindows.filter(
          (window) => window.id !== id
        ),
      }));
    },
    setMinimizedDockIndicatorRef: (ref: HTMLDivElement) => {
      set({ minimizedDockIndicatorRef: ref });
    },
  },
}));

export function useMinimizingWindow(id: string) {
  return useWindowAnimationStore((state) =>
    state.minimizingWindows.find((window) => window.id === id)
  );
}

export function useMaximizingWindow(id: string) {
  return useWindowAnimationStore((state) =>
    state.maximizingWindows.find((window) => window.id === id)
  );
}

export function useWindowAnimationAction() {
  return useWindowAnimationStore((state) => state.actions);
}
