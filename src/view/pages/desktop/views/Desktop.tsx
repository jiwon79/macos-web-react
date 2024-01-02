import { useWindowStore } from '../../../../domain/store';
import { WindowRenderer } from '../../../../domain/window';

export function Desktop() {
  const { windows, updateWindow } = useWindowStore();

  return (
    <>
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
    </>
  );
}
