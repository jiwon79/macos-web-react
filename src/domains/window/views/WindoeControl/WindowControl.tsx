import {
  IconWindowClose,
  IconWindowMaximize,
  IconWindowMinimize,
} from 'assets/icons';
import {
  closeIcon,
  container,
  maximizeIcon,
  minimizeIcon,
} from './WindowControl.css.ts';

interface WindowControlProps {
  size?: 'standard' | 'mono' | 'withTitle';
}

export function WindowControl({ size }: WindowControlProps) {
  return (
    <div className={container({ size })}>
      <button className={closeIcon}>
        <IconWindowClose />
      </button>
      <button className={minimizeIcon}>
        <IconWindowMinimize />
      </button>
      <button className={maximizeIcon}>
        <IconWindowMaximize />
      </button>
    </div>
  );
}
