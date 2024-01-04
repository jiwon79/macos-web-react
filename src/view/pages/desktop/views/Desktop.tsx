import {
  userUserInteractionActions,
  useUserInteraction,
  useWindowStore,
} from '../../../../domain/store';
import { WindowRenderer } from '../../../../domain/window';
import * as styles from './Desktop.css.ts';

export function Desktop() {
  const { windows, updateWindow } = useWindowStore();
  const isDragging = useUserInteraction((state) => state.isDragging);
  const mousePosition = useUserInteraction((state) => state.mousePosition);
  const focusedWindowID = useWindowStore((state) => state.focusedWindowID);
  const { setMousePosition } = userUserInteractionActions();

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
        x: focusedWindow.x + dx,
        y: focusedWindow.y + dy,
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
            x={window.x}
            y={window.y}
            width={window.width}
            height={window.height}
            setX={(newX: number) => {
              updateWindow(window.id, {
                x: newX,
              });
            }}
            setY={(newY: number) => {
              updateWindow(window.id, {
                y: newY,
              });
            }}
            setWidth={(newWidth: number) => {
              updateWindow(window.id, {
                width: newWidth,
              });
            }}
            setHeight={(newHeight: number) => {
              updateWindow(window.id, {
                height: newHeight,
              });
            }}
          >
            {window.window}
          </WindowRenderer>
        ))}
      <p>DOCK</p>
    </div>
  );
}
