import { useWindowStore } from '../../../../domain/store';
import { WindowRenderer } from '../../../../domain/window';

export function Desktop() {
  const store = useWindowStore();

  return (
    <>
      <p>MENU</p>
      {store.windows &&
        store.windows.map((window) => (
          <WindowRenderer
            id={window.id}
            x={window.x}
            y={window.y}
            width={window.width}
            height={window.height}
            setX={() => {}}
            setY={() => {}}
            setWidth={() => {}}
            setHeight={() => {}}
          >
            {window.window}
          </WindowRenderer>
        ))}
      <p>DOCK</p>
    </>
  );
}
