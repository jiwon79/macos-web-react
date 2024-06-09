import { SubmenuConfig } from 'domains/app/interface';
import {
  container,
  divider,
  submenuButton,
  submenuContainer,
  submenuShortcutText,
  submenuText,
} from './SubmenuGroup.css';
import { Fragment } from 'react/jsx-runtime';

interface SubMenusProps {
  submenuGroup: SubmenuConfig[][];
}

export function SubmenuGroup({ submenuGroup }: SubMenusProps) {
  return (
    <div className={container}>
      {submenuGroup.map((submenus, index) => (
        <Fragment key={index}>
          <div className={submenuContainer}>
            {submenus.map(({ name, disabled = false, shortcut }) => (
              <button key={name} className={submenuButton({ disabled })}>
                <p className={submenuText({ disabled })}>{name}</p>
                {shortcut && <p className={submenuShortcutText}>{shortcut}</p>}
              </button>
            ))}
          </div>
          {index !== submenuGroup.length - 1 && <hr className={divider} />}
        </Fragment>
      ))}
    </div>
  );
}
