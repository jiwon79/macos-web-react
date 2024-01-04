import { UserInteractionActions, UserInteractionState } from '../interface';
import { create } from '../../../third-parties/zustand';

const initialUserInteractionState: UserInteractionState = {
  isDragging: false,
  mousePosition: { x: 0, y: 0 },
};

export const useUserInteraction = create<
  UserInteractionState,
  UserInteractionActions
>((set) => ({
  ...initialUserInteractionState,
  actions: {
    startDragging: () => set({ isDragging: true }),
    endDragging: () => set({ isDragging: false }),
    setMousePosition: (x: number, y: number) =>
      set({ mousePosition: { x, y } }),
  },
}));

export const userUserInteractionActions = () =>
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useUserInteraction((state) => state.actions);
