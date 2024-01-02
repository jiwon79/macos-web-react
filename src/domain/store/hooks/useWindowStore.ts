import { create } from 'zustand';
import { WindowInfo } from '../interface';
import { initWindowInfos } from './test.tsx';

interface WindowStoreState {
  windows: WindowInfo[];
  addWindow: (window: WindowInfo) => void;
  removeWindow: (id: string) => void;
  updateWindow: (id: string, data: Partial<WindowInfo>) => void;
}

export const useWindowStore = create<WindowStoreState>((set) => ({
  windows: initWindowInfos as WindowInfo[],
  addWindow: (window: WindowInfo) =>
    set((state) => ({ windows: [...state.windows, window] })),
  removeWindow: (id: string) =>
    set((state) => ({
      windows: state.windows.filter((window) => window.id !== id),
    })),
  updateWindow: (id: string, data: Partial<WindowInfo>) =>
    set((state) => ({
      windows: state.windows.map((window) =>
        window.id === id ? { ...window, ...data } : window
      ),
    })),
}));
