import { MenuConfig } from 'domains/app/interface';
import { FloatingMenu } from '../../../floating-menu/FloatingMenu';
import { SubmenuGroup } from '../submenu-group/SubmenuGroup';

interface MenuItemProps {
  menu: MenuConfig;
  type: 'text' | 'text-bold';
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
      <FloatingMenu.Trigger type={type}>{menu.name}</FloatingMenu.Trigger>
      <FloatingMenu.Content>
        <SubmenuGroup submenuGroup={menu.submenuGroups} />
      </FloatingMenu.Content>
    </FloatingMenu>
  );
}
