import { SubmenuConfig } from 'domains/app/interface';
import { Fragment } from 'react/jsx-runtime';
import { SubmenuDivider } from '../submenu-divider';
import { Submenus } from '../submenus';
import { container } from './SubmenuGroup.css';

interface SubMenusProps {
  submenuGroup: SubmenuConfig[][];
}

export function SubmenuGroup({ submenuGroup }: SubMenusProps) {
  return (
    <div className={container}>
      {submenuGroup.map((submenus, index) => (
        <Fragment key={index}>
          <Submenus submenus={submenus} />
          {index !== submenuGroup.length - 1 && <SubmenuDivider />}
        </Fragment>
      ))}
    </div>
  );
}
