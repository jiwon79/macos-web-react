import { DockItem } from '../DockItem';
import { DockSeparator } from '../DockSeparator';
import * as styles from './Dock.css.ts';

export function Dock() {
  return (
    <div className={styles.container}>
      <DockItem src="src/assets/app-icons/ic_app_calculator.png" open />
      <DockSeparator />
      <DockItem src="src/assets/app-icons/ic_app_calculator.png" />
      <DockItem src="src/assets/app-icons/ic_app_calculator.png" />
    </div>
  );
}
