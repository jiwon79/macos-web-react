import { MenuConfig } from 'domains/app/interface';
import { MenuBase } from '../../../menu-base';
import { container } from './MenuAppName.css';

interface MenuAppNameProps {
  menu: MenuConfig;
  selected: boolean;
  onSelectedChange: (selected: boolean) => void;
}

export function MenuAppName({
  menu,
  selected,
  onSelectedChange,
}: MenuAppNameProps) {
  return (
    <MenuBase
      className={container}
      name={menu.name}
      selected={selected}
      onSelectedChange={onSelectedChange}
    >
      {menu.name}
    </MenuBase>
  );
}
