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
      className={logoContainer}
      name="Apple"
      selected={selected}
      onSelectedChange={onSelectedChange}
    >
      <IconAppleLogo />
    </MenuBase>
  );
}
