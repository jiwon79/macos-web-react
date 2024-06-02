import { MenuConfig } from 'domains/app/interface';
import { FloatingMenu } from '../floating-menu/FloatingMenu';

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
      <FloatingMenu.Trigger type={type}>{menu.name}</FloatingMenu.Trigger>
      <FloatingMenu.Content>
        {menu.submenuGroups.map((submenuGroup, index) => (
          <div key={index} style={{ display: 'flex', flexDirection: 'column' }}>
            {submenuGroup.map((submenu) => (
              <button key={submenu.name}>{submenu.name}</button>
            ))}
          </div>
        ))}
      </FloatingMenu.Content>
    </FloatingMenu>
  );
}
