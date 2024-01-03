import { create } from 'zustand';

interface UserInteraction {
  isDragging: boolean;
  mousePosition: { x: number; y: number };
  selectedWindow?: string;
  setSelectedWindow: (windowId: string) => void;
  startDragging: (windowID: string) => void;
  endDragging: () => void;
  updateMousePosition: (x: number, y: number) => void;
}

export const useUserInteraction = create<UserInteraction>((set) => ({
  isDragging: false,
  mousePosition: { x: 0, y: 0 },
  selectedWindow: undefined,
  startDragging: (windowID: string) =>
    set({ isDragging: true, selectedWindow: windowID }),
  endDragging: () => set({ isDragging: false, setSelectedWindow: undefined }),
  setSelectedWindow: (windowId: string) => set({ selectedWindow: windowId }),
  updateMousePosition: (x: number, y: number) => {
    set({ mousePosition: { x, y } });
    console.log('update mouse position :', x, y);
  },
}));
