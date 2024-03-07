import { WindowControl } from '../WindoeControl';
import { WindowMovableArea } from '../WindowMovableArea';
import { container } from './Window.css.ts';

interface WindowProps {
  children?: React.ReactNode;
}

export function Window({ children }: WindowProps) {
  return <div className={container}>{children}</div>;
}

Window.Control = WindowControl;
Window.MovableArea = WindowMovableArea;
