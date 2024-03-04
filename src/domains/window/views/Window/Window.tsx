import { WindowControl } from '../WindoeControl/index.ts';
import { WindowMovableArea } from '../WindowMovableArea/index.ts';
import { WindowResize } from '../WindowResize/index.ts';
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
