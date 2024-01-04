import { container } from './WindowMovableArea.css.ts';
import { useWindowContext } from '../WindowRenderer';
import { userUserInteractionActions, useWindowStore } from '../../../store';

interface WindowMovableAreaProps {
  children?: React.ReactNode;
}

export function WindowMovableArea({ children }: WindowMovableAreaProps) {
  const { id: windowID } = useWindowContext();
  const { startDragging, endDragging } = userUserInteractionActions();
  const { setFocusedWindowID } = useWindowStore();

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
