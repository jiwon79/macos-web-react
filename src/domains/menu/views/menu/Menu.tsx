import { MenuConfig } from 'domains/app/interface';
import { MenuLeft } from '../menu-left';
import { container } from './Menu.css';

interface MenuProps {
  menus: MenuConfig[];
}

export function Menu({ menus }: MenuProps) {
  return (
    <div
      className={container}
      onMouseDownCapture={(event) => event.stopPropagation()}
    >
      <MenuLeft menus={menus} />
      <p>RIGHT</p>
    </div>
  );
}
