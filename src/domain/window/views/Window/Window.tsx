import { container } from './Window.css.ts';
import { WindowControl } from '../WindoeControl';

interface WindowProps {
  children?: React.ReactNode;
}

export function Window({ children }: WindowProps) {
  return <div className={container}>{children}</div>;
}

Window.Control = WindowControl;
