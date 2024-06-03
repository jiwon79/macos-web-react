import { MenuConfig } from 'domains/app/interface';
import { FloatingMenu } from '../../../floating-menu/FloatingMenu';
import { SubmenuGroups } from '../submenu-groups/SubMenus';
import { MenuBase } from 'domains/menu/views/menu-base';

interface MenuItemProps {
  menu: MenuConfig;
  type: 'app-name' | 'item';
  focused: boolean;
  selected: boolean;
  onSelectedChange: (selected: boolean) => void;
}

export function MenuItem({
  menu,
  type,
  focused,
  selected,
  onSelectedChange,
}: MenuItemProps) {
  return (
    <FloatingMenu
      focused={focused}
      selected={selected}
      onSelectedChange={onSelectedChange}
    >
      <FloatingMenu.Trigger type={type}>
        <MenuBase selected={selected} type={type}>
          {menu.name}
        </MenuBase>
      </FloatingMenu.Trigger>
      <FloatingMenu.Content>
        <SubmenuGroups submenuGroups={menu.submenuGroups} />
      </FloatingMenu.Content>
    </FloatingMenu>
  );
}
