import { useUserInteraction, useWindowStore } from '../../../../domain/store';
import { WindowRenderer } from '../../../../domain/window';
import * as styles from './Desktop.css.ts';

export function Desktop() {
  const { windows, updateWindow } = useWindowStore();
  const { isDragging, mousePosition, selectedWindow, updateMousePosition } =
    useUserInteraction();

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const lastMousePosition = mousePosition;
    updateMousePosition(e.clientX, e.clientY);
    const window = windows.find((window) => window.id === selectedWindow);
    if (window && selectedWindow && isDragging) {
      const dx = e.clientX - lastMousePosition.x;
      const dy = e.clientY - lastMousePosition.y;
      updateWindow(selectedWindow, {
        x: window.x + dx,
        y: window.y + dy,
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
