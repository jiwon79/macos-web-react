import { container } from './WindowControl.css.ts';
import {
  IconWindowClose,
  IconWindowMaximize,
  IconWindowMinimize,
} from '../../../../assets';

export function WindowControl() {
  return (
    <div className={container}>
      <IconWindowClose />
      <IconWindowMinimize />
      <IconWindowMaximize />
      <p>WindowControlMenu</p>
    </div>
  );
}
