import { IconAppleLogo } from 'assets/icons';
import { logoContainer } from './MenuAppleLogo.css';
import { MenuBase } from '../../../menu-base';

interface MenuAppleLogoProps {
  selected: boolean;
  onSelectedChange: (selected: boolean) => void;
}

export function MenuAppleLogo({
  selected,
  onSelectedChange,
}: MenuAppleLogoProps) {
  return (
    <MenuBase
      type="apple-logo"
      className={logoContainer}
      selected={selected}
      onSelectedChange={onSelectedChange}
    >
      <IconAppleLogo />
    </MenuBase>
  );
}
