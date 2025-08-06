import type { SubmenuConfig } from "domains/app/interface";
import {
  submenuButton,
  submenuContainer,
  submenuShortcutText,
  submenuText
} from "./Submenus.css";

interface SubmnuesProps {
  submenus: SubmenuConfig[];
}

export function Submenus({ submenus }: SubmnuesProps) {
  return (
    <div className={submenuContainer}>
      {submenus.map(({ name, disabled = false, shortcut }) => (
        <button
          type="button"
          key={name}
          className={submenuButton({ disabled })}
        >
          <p className={submenuText({ disabled })}>{name}</p>
          {shortcut && <p className={submenuShortcutText}>{shortcut}</p>}
        </button>
      ))}
    </div>
  );
}
