import { MenuConfig } from 'domains/app/interface';
import { MenuBase } from '../../../menu-base';
import { container } from './MenuAppName.css';

interface MenuAppNameProps {
  menu: MenuConfig;
}

export function MenuAppName({ menu }: MenuAppNameProps) {
  return <MenuBase className={container}>{menu.name}</MenuBase>;
}
