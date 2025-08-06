import { cn } from 'third-parties/classnames';
import { WindowControl } from '../WindowControl/index.ts';
import { WindowMovableArea } from '../WindowMovableArea';
import { container } from './Window.css.ts';

interface WindowProps {
  children?: React.ReactNode;
  className?: string;
}

export function Window({ children, className }: WindowProps) {
  return <div className={cn(container, className)}>{children}</div>;
}

Window.Control = WindowControl;
Window.MovableArea = WindowMovableArea;
