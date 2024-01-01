import { create } from 'zustand';
import { WindowInfo } from '../interface';
import { initWindowInfos } from './test.tsx';

interface WindowStoreState {
  windows: WindowInfo[];
}

export const useWindowStore = create<WindowStoreState>((set) => ({
  windows: initWindowInfos as WindowInfo[],
  addWindow: (window: WindowInfo) =>
    set((state) => ({ windows: [...state.windows, window] })),
}));
