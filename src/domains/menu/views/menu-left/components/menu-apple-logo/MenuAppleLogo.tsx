import { IconAppleLogo } from 'assets/icons';
import { FloatingMenu } from 'domains/menu/views/floating-menu/FloatingMenu';
import { SubmenuGroups } from 'domains/menu/views/menu-left/components/submenu-groups/SubMenus';

interface MenuAppleLogoProps {
  focused: boolean;
  selected: boolean;
  onSelectedChange: (selected: boolean) => void;
}

export function MenuAppleLogo({
  focused,
  selected,
  onSelectedChange,
}: MenuAppleLogoProps) {
  return (
    <FloatingMenu
      focused={focused}
      selected={selected}
      onSelectedChange={onSelectedChange}
    >
      <FloatingMenu.Trigger type="icon">
        <IconAppleLogo />
      </FloatingMenu.Trigger>
      <FloatingMenu.Content>
        <SubmenuGroups submenuGroups={[]} />
      </FloatingMenu.Content>
    </FloatingMenu>
  );
}
