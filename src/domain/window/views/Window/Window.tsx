import { ResizableEventByType } from '../../../../module/resizable/interfaces/Event.ts';
import { WindowControl } from '../WindoeControl';
import { WindowMovableArea } from '../WindowMovableArea';
import { WindowResizer } from '../WindowResizer/WindowResizer.tsx';
import { container } from './Window.css.ts';

interface WindowProps {
  children?: React.ReactNode;
}

export function Window({ children }: WindowProps) {
  return (
    <div className={container}>
      <WindowResizer>{children}</WindowResizer>
    </div>
  );
}

Window.Control = WindowControl;
Window.MovableArea = WindowMovableArea;
