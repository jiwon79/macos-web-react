import { MenuAppName, MenuAppleLogo } from './components';
import { MenuItem } from '../menu-item';
import { contianer } from './MenuLeft.css';
import { MenuConfig } from 'domains/app/interface';

interface MenuLeftProps {
  menus: MenuConfig[];
}

export function MenuLeft({ menus }: MenuLeftProps) {
  return (
    <div className={contianer}>
      <MenuAppleLogo />
      {menus.map((menu, index) => {
        if (index === 0) {
          return <MenuAppName key={menu.name} menu={menu} />;
        }
        return <MenuItem key={menu.name} menu={menu} />;
      })}
    </div>
  );
}
