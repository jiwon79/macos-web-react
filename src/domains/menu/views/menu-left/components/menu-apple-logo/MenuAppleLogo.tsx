import { IconAppleLogo } from 'assets/icons';
import { logoContainer } from './MenuAppleLogo.css';
import { MenuBase } from '../../../menu-base';

export function MenuAppleLogo() {
  return (
    <MenuBase className={logoContainer} selected>
      <IconAppleLogo />
    </MenuBase>
  );
}
