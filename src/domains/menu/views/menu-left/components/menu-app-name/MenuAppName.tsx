import { MenuBase } from '../../../menu-base';
import { container } from './MenuAppName.css';

interface MenuAppNameProps {
  name: string;
}

export function MenuAppName({ name }: MenuAppNameProps) {
  return <MenuBase className={container}>{name}</MenuBase>;
}
