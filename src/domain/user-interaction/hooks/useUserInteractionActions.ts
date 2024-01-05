import { useUserInteractionStore } from './useUserInteractionStore.ts';

export function useUserInteractionActions() {
  return useUserInteractionStore((state) => state.actions);
}
