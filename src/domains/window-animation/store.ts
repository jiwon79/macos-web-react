import { MinimizedWindow } from 'domains/window/interface';
import { create } from 'third-parties/zustand';

export interface WindowAnimationState {
  minimizingWindows: MinimizedWindow[];
  maximizingWindows: MinimizedWindow[];
  minimizedDockIndicatorElement: HTMLDivElement | null;
  dockItemElements: Map<string, HTMLElement>;
  dockElement: HTMLElement | null;
}

export interface WindowAnimationAction {
  startMinimizingWindow: (window: MinimizedWindow) => void;
  stopMinimizingWindow: (id: string) => void;
  startMaximizingWindow: (window: MinimizedWindow) => void;
  stopMaximizingWindow: (id: string) => void;
  setMinimizedDockIndicatorRef: (ref: HTMLDivElement) => void;
  setDockItemElement: (id: string, ref: HTMLElement | null) => void;
  getDockItemElement: (id: string) => HTMLElement | undefined;
  setDockElement: (ref: HTMLElement | null) => void;
}

export const useWindowAnimationStore = create<
  WindowAnimationState,
  WindowAnimationAction
>((set): WindowAnimationState & { actions: WindowAnimationAction } => ({
  minimizingWindows: [],
  maximizingWindows: [],
  minimizedDockIndicatorElement: null,
  dockItemElements: new Map(),
  dockElement: null,
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
      set({ minimizedDockIndicatorElement: ref });
    },
    setDockItemElement: (id: string, ref: HTMLElement | null) => {
      set((state) => {
        const newRefs = new Map(state.dockItemElements);
        if (ref) {
          newRefs.set(id, ref);
        } else {
          newRefs.delete(id);
        }
        return { dockItemElements: newRefs };
      });
    },
    getDockItemElement: (id: string): HTMLElement | undefined => {
      return useWindowAnimationStore.getState().dockItemElements.get(id);
    },
    setDockElement: (ref: HTMLElement | null) => {
      set({ dockElement: ref });
    },
  },
}));

export function useMinimizingWindow(id: string) {
  return useWindowAnimationStore((state) =>
    state.minimizingWindows.find((window: MinimizedWindow) => window.id === id)
  );
}

export function useMaximizingWindow(id: string) {
  return useWindowAnimationStore((state) =>
    state.maximizingWindows.find((window: MinimizedWindow) => window.id === id)
  );
}

export function useWindowAnimationAction() {
  return useWindowAnimationStore((state) => state.actions);
}
