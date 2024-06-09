import { HTMLAttributes, createContext, useContext } from 'react';

type FloatingMenuContext = {
  focused: boolean;
  selected: boolean;
  onSelectedChange: (selected: boolean) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  refs: {
    setReference: (element: HTMLElement | null) => void;
    setFloating: (element: HTMLElement | null) => void;
  };
  floating: HTMLAttributes<HTMLElement>;
  reference: HTMLAttributes<HTMLElement>;
} | null;

export const FloatingMenuContext = createContext<FloatingMenuContext>(null);

export function useFloatingMenuContext() {
  const context = useContext(FloatingMenuContext);
  if (context === null) {
    throw new Error('FloatingMenuContext must be used within a FloatingMenu');
  }

  return context;
}
