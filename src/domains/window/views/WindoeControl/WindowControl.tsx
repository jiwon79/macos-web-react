import {
  IconWindowClose,
  IconWindowMaximize,
  IconWindowMinimize,
} from 'assets/icons';
import { useWindowsAction } from 'domains/window/store/store.ts';
import { useWindowContext } from '../WindowContext.ts';
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
  const { id } = useWindowContext();
  const { removeWindow } = useWindowsAction();

  const onCloseMouseDown = (event: React.MouseEvent) => {
    event.stopPropagation();
    removeWindow(id);
  };

  const onControlButtonMouseDown = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <div className={container({ size })}>
      <button className={closeIcon} onMouseDown={onCloseMouseDown}>
        <IconWindowClose />
      </button>
      <button className={minimizeIcon} onMouseDown={onControlButtonMouseDown}>
        <IconWindowMinimize />
      </button>
      <button className={maximizeIcon} onMouseDown={onControlButtonMouseDown}>
        <IconWindowMaximize />
      </button>
    </div>
  );
}
