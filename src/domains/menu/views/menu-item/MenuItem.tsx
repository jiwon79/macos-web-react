import { MenuBase } from '../menu-base';
import { item } from './MenuItem.css';

interface MenuItemProps {
  children: React.ReactNode;
}

export function MenuItem({ children }: MenuItemProps) {
  return (
    <MenuBase className={item} selectOnHover>
      {children}
    </MenuBase>
  );
}
