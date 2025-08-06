import { WindowStyle } from 'domains/window/interface/window';
import { createContext, useContext } from 'react';

interface WindowContextProps {
  id: string;
  style: WindowStyle;
  onStyleChange: (style: Partial<WindowStyle>) => void;
}

export const WindowContext = createContext<WindowContextProps>({
  id: '',
  style: {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  },
  onStyleChange: () => {},
});

export function useWindowContext() {
  return useContext(WindowContext);
}
