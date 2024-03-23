import { cn } from 'third-parties/classnames';
import { dockIcon } from './DockIconOpenIndicator.css';

interface DockIconOpenIndicatorProps {
  open?: boolean;
  className?: string;
}

/**
 * @param open - default false
 */
export function DockIconOpenIndicator({
  className,
  open = false,
}: DockIconOpenIndicatorProps) {
  return <div className={cn(className, dockIcon({ open }))} />;
}
