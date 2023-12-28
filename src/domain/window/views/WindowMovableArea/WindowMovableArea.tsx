import { container } from './WindowMovableArea.css.ts';

interface WindowMovableAreaProps {
  children?: React.ReactNode;
}

export function WindowMovableArea({ children }: WindowMovableAreaProps) {
  return <div className={container}>{children}</div>;
}
