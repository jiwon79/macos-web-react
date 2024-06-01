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
      <MenuAppName name="Apple" />
      <MenuItem>File</MenuItem>
      <MenuItem>Edit</MenuItem>
      <MenuItem>View</MenuItem>
    </div>
  );
}
