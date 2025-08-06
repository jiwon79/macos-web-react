import type { MenuConfig } from "domains/app/interface";
import { MenuLeft } from "../menu-left";
import {
  backgroundBlur,
  backgroundColorBurn,
  container,
  menuContainer
} from "./Menu.css";

interface MenuProps {
  menus: MenuConfig[];
}

export function Menu({ menus }: MenuProps) {
  return (
    <div
      className={container}
      onMouseDownCapture={(event) => event.stopPropagation()}
    >
      <div className={menuContainer}>
        <MenuLeft menus={menus} />
        <p>RIGHT</p>
      </div>
      <div className={backgroundBlur} />
      <div className={backgroundColorBurn} />
    </div>
  );
}
