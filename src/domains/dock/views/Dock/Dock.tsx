import { IconAppCalculator } from 'assets/app-icons/index.ts';
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
      <DockItem mouseX={mouseX} src={IconAppCalculator} open />
      <DockSeparator />
      <DockItem mouseX={mouseX} src={IconAppCalculator} />
      <DockItem mouseX={mouseX} src={IconAppCalculator} />
      <DockItem mouseX={mouseX} src={IconAppCalculator} />
      <DockItem mouseX={mouseX} src={IconAppCalculator} />
      <DockItem mouseX={mouseX} src={IconAppCalculator} />
      <DockItem mouseX={mouseX} src={IconAppCalculator} />
      <DockSeparator />
      <DockItem mouseX={mouseX} src={IconAppCalculator} />
      <DockItem mouseX={mouseX} src={IconAppCalculator} />
    </div>
  );
}
