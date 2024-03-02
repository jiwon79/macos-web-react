import {
  useUserInteractionActions,
  useUserInteractionStore,
} from '../../../../domain/user-interaction';
import { WindowRenderer } from '../../../../domain/window';
import * as styles from './Desktop.css.ts';
import {
  useFocusedWindowID,
  useWindows,
  useWindowsActions,
} from '../../../../domain/window/hooks';

export function Desktop() {
  const windows = useWindows();
  const focusedWindowID = useFocusedWindowID();
  const { updateWindow } = useWindowsActions();
  const isDragging = useUserInteractionStore((state) => state.isDragging);
  const mousePosition = useUserInteractionStore((state) => state.mousePosition);
  const { setMousePosition } = useUserInteractionActions();

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const lastMousePosition = mousePosition;
    setMousePosition(e.clientX, e.clientY);
    const focusedWindow = windows.find(
      (window) => window.id === focusedWindowID
    );
    if (focusedWindow && isDragging) {
      const dx = e.clientX - lastMousePosition.x;
      const dy = e.clientY - lastMousePosition.y;
      updateWindow(focusedWindow.id, {
        style: {
          ...focusedWindow.style,
          x: focusedWindow.style.x + dx,
          y: focusedWindow.style.y + dy,
        },
      });
    }
  };

  return (
    <div onMouseMove={onMouseMove} className={styles.desktop}>
      <p>MENU</p>
      {windows &&
        windows.map((window) => (
          <WindowRenderer
            key={window.id}
            id={window.id}
            x={window.style.x}
            y={window.style.y}
            width={window.style.width}
            height={window.style.height}
            setX={(newX: number) => {
              updateWindow(window.id, { style: { x: newX } });
            }}
            setY={(newY: number) => {
              updateWindow(window.id, { style: { y: newY } });
            }}
            setWidth={(newWidth: number) => {
              updateWindow(window.id, { style: { width: newWidth } });
            }}
            setHeight={(newHeight: number) => {
              updateWindow(window.id, { style: { height: newHeight } });
            }}
          >
            {window.content}
          </WindowRenderer>
        ))}
      <p>DOCK</p>
    </div>
  );
}
