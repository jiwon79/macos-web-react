import { useState } from 'react';
import { DockItem } from '../DockItem';
import { DockSeparator } from '../DockSeparator';
import * as styles from './Dock.css.ts';

export function Dock() {
  const [mouseX, setMouseX] = useState<number | null>(null);

  return (
    <div
      className={styles.container}
      onMouseMove={(event) => setMouseX(event.clientX)}
      onMouseLeave={() => setMouseX(null)}
    >
      <DockItem
        mouseX={mouseX}
        src="src/assets/app-icons/ic_app_calculator.png"
        open
      />
      <DockSeparator />
      <DockItem
        mouseX={mouseX}
        src="src/assets/app-icons/ic_app_calculator.png"
      />
      <DockItem
        mouseX={mouseX}
        src="src/assets/app-icons/ic_app_calculator.png"
      />
      <DockItem
        mouseX={mouseX}
        src="src/assets/app-icons/ic_app_calculator.png"
      />
      <DockItem
        mouseX={mouseX}
        src="src/assets/app-icons/ic_app_calculator.png"
      />
      <DockItem
        mouseX={mouseX}
        src="src/assets/app-icons/ic_app_calculator.png"
      />
      <DockItem
        mouseX={mouseX}
        src="src/assets/app-icons/ic_app_calculator.png"
      />
      <DockSeparator />
      <DockItem
        mouseX={mouseX}
        src="src/assets/app-icons/ic_app_calculator.png"
      />
      <DockItem
        mouseX={mouseX}
        src="src/assets/app-icons/ic_app_calculator.png"
      />
    </div>
  );
}
