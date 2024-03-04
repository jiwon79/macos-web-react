import { useUserInteractionActions } from 'domains/user-interaction';
import { useWindowsActions } from 'domains/window/hooks';
import { useWindowContext } from '..';
import { container } from './WindowMovableArea.css.ts';

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
