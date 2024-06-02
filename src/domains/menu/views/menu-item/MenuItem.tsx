import { MenuConfig } from 'domains/app/interface';
import { MenuBase } from '../menu-base';
import { item } from './MenuItem.css';

interface MenuItemProps {
  menu: MenuConfig;
}

export function MenuItem({ menu }: MenuItemProps) {
  return (
    <MenuBase className={item} selectOnHover>
      {menu.name}
      {menu.submenuGroups.map((submenuGroup, index) => (
        <div key={index}>
          {submenuGroup.map((submenu) => (
            <button key={submenu.name}>{submenu.name}</button>
          ))}
        </div>
      ))}
    </MenuBase>
  );
}

//     {app.menus.map((menu) => (
//       <Fragment key={menu.name}>
//         <p>{menu.name}</p>
//         {menu.submenuGroups.map((submenuGroup, index) => (
//           <div key={index}>
//             {submenuGroup.map((submenu) => (
//               <button key={submenu.name}>{submenu.name}</button>
//             ))}
//           </div>
//         ))}
//       </Fragment>
//     ))}
