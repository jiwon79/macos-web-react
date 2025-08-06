import { FloatingMenu } from "domains/menu/views/floating-menu";
import { SubmenuGroup } from "domains/menu/views/menu-left/components/submenu-group";
import { menuAppleconfig } from "./menuAppleConfig";

interface MenuAppleLogoProps {
  focused: boolean;
  selected: boolean;
  onSelectedChange: (selected: boolean) => void;
}

export function MenuAppleLogo({
  focused,
  selected,
  onSelectedChange
}: MenuAppleLogoProps) {
  return (
    <FloatingMenu
      focused={focused}
      selected={selected}
      onSelectedChange={onSelectedChange}
    >
      <FloatingMenu.Trigger type="icon"></FloatingMenu.Trigger>
      <FloatingMenu.Content>
        <SubmenuGroup submenuGroup={menuAppleconfig.submenuGroups} />
      </FloatingMenu.Content>
    </FloatingMenu>
  );
}
