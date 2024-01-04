import { container } from './WindowMovableArea.css.ts';
import { useWindowContext } from '../WindowRenderer';
import { userUserInteractionActions } from '../../../store';
import { useWindowsActions } from '../../hooks';

interface WindowMovableAreaProps {
  children?: React.ReactNode;
}

export function WindowMovableArea({ children }: WindowMovableAreaProps) {
  const { id: windowID } = useWindowContext();
  const { startDragging, endDragging } = userUserInteractionActions();
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
