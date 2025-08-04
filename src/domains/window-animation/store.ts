import { MinimizedWindow } from 'domains/window/interface';
import { create } from 'third-parties/zustand';

export interface WindowAnimationState {
  minimizingWindows: MinimizedWindow[];
  maximizingWindows: MinimizedWindow[];
  minimizedDockIndicatorRef: HTMLDivElement | null;
  dockItemRefs: Map<string, HTMLElement>;
  dockRef: HTMLElement | null;
}

export interface WindowAnimationAction {
  startMinimizingWindow: (window: MinimizedWindow) => void;
  stopMinimizingWindow: (id: string) => void;
  startMaximizingWindow: (window: MinimizedWindow) => void;
  stopMaximizingWindow: (id: string) => void;
  setMinimizedDockIndicatorRef: (ref: HTMLDivElement) => void;
  setDockItemRef: (id: string, ref: HTMLElement | null) => void;
  getDockItemRef: (id: string) => HTMLElement | undefined;
  setDockRef: (ref: HTMLElement | null) => void;
  getDockRef: () => HTMLElement | null;
}

export const useWindowAnimationStore = create<
  WindowAnimationState,
  WindowAnimationAction
>((set): WindowAnimationState & { actions: WindowAnimationAction } => ({
  minimizingWindows: [],
  maximizingWindows: [],
  minimizedDockIndicatorRef: null,
  dockItemRefs: new Map(),
  dockRef: null,
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
    setDockItemRef: (id: string, ref: HTMLElement | null) => {
      set((state) => {
        const newRefs = new Map(state.dockItemRefs);
        if (ref) {
          newRefs.set(id, ref);
        } else {
          newRefs.delete(id);
        }
        return { dockItemRefs: newRefs };
      });
    },
    getDockItemRef: (id: string): HTMLElement | undefined => {
      return useWindowAnimationStore.getState().dockItemRefs.get(id);
    },
    setDockRef: (ref: HTMLElement | null) => {
      set({ dockRef: ref });
    },
    getDockRef: (): HTMLElement | null => {
      return useWindowAnimationStore.getState().dockRef;
    },
  },
}));

type WindowAnimationStore = WindowAnimationState & { actions: WindowAnimationAction };

export function useMinimizingWindow(id: string) {
  return useWindowAnimationStore((state: WindowAnimationStore) =>
    state.minimizingWindows.find((window: MinimizedWindow) => window.id === id)
  );
}

export function useMaximizingWindow(id: string) {
  return useWindowAnimationStore((state: WindowAnimationStore) =>
    state.maximizingWindows.find((window: MinimizedWindow) => window.id === id)
  );
}

export function useWindowAnimationAction() {
  return useWindowAnimationStore((state: WindowAnimationStore) => state.actions);
}
