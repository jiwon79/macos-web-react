import { SubmenuConfig } from 'domains/app/interface';
import {
  submenuContainer,
  submenuButton,
  submenuText,
  submenuShortcutText,
} from './Submenus.css';

interface SubmnuesProps {
  submenus: SubmenuConfig[];
}

export function Submenus({ submenus }: SubmnuesProps) {
  return (
    <div className={submenuContainer}>
      {submenus.map(({ name, disabled = false, shortcut }) => (
        <button key={name} className={submenuButton({ disabled })}>
          <p className={submenuText({ disabled })}>{name}</p>
          {shortcut && <p className={submenuShortcutText}>{shortcut}</p>}
        </button>
      ))}
    </div>
  );
}
