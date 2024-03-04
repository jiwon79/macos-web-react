import { WindowControl } from '../WindoeControl';
import { WindowMovableArea } from '../WindowMovableArea';
import { WindowResize } from '../WindowResize';
import { container } from './Window.css.ts';

interface WindowProps {
  children?: React.ReactNode;
}

export function Window({ children }: WindowProps) {
  return (
    <div className={container}>
      <WindowResize>{children}</WindowResize>
    </div>
  );
}

Window.Control = WindowControl;
Window.MovableArea = WindowMovableArea;
