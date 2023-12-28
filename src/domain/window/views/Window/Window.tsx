import { container } from './Window.css.ts';
import { WindowControlMenu } from '../WindoeControlMenu';

interface WindowProps {
  children?: React.ReactNode;
}

export function Window({ children }: WindowProps) {
  return <div className={container}>{children}</div>;
}

Window.ControlMenu = WindowControlMenu;
