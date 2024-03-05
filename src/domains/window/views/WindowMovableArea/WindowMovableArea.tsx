import { useUserInteractionActions } from 'domains/user-interaction';
import { useWindowContext } from '..';
import { container } from './WindowMovableArea.css.ts';
import { useWindowsActions } from 'domains/window/store';

interface WindowMovableAreaProps {
  children?: React.ReactNode;
}

export function WindowMovableArea({ children }: WindowMovableAreaProps) {
  const { id: windowID } = useWindowContext();
  const { startDragging, endDragging } = useUserInteractionActions();
  const { setFocusedWindowID } = useWindowsActions();

  const onMouseDown = () => {
    startDragging();
    setFocusedWindowID(windowID);
  };

  const onMouseUp = () => {
    endDragging();
  };

  return (
    <div className={container} onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
      {children}
    </div>
  );
}
