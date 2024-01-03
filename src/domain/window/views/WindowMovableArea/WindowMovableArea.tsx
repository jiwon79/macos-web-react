import { container } from './WindowMovableArea.css.ts';
import { useWindowContext } from '../WindowRenderer';
import { useUserInteraction } from '../../../store';

interface WindowMovableAreaProps {
  children?: React.ReactNode;
}

export function WindowMovableArea({ children }: WindowMovableAreaProps) {
  const windowContext = useWindowContext();
  const { startDragging, endDragging } = useUserInteraction();

  const onMouseDown = () => {
    startDragging(windowContext.id);
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
