import { create } from "third-parties/zustand";

export interface DockState {
  mouseX: number | null;
}

export interface DockAction {
  setMouseX: (mouseX: number | null) => void;
}

export const useDock = create<DockState, DockAction>((set) => ({
  mouseX: null,
  actions: {
    setMouseX: (mouseX) => set({ mouseX })
  }
}));

export function useDockAction() {
  return useDock((state) => state.actions);
}
