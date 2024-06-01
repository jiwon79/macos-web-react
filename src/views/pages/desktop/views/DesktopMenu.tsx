import { applications } from 'domains/app/applications';
import { Menu } from 'domains/menu/views/menu';
import { useFocusedWindow } from 'domains/window/store';
import { memo } from 'react';

export function DesktopMenu() {
  const focusedWindow = useFocusedWindow();

  return <InnerMenu appID={focusedWindow?.appID || 'Finder'} />;
}

const InnerMenu = memo(({ appID }: { appID: string }) => {
  const app = applications.get(appID);
  const menus = app?.menus;

  if (menus == null) {
    return;
  }

  return <Menu menus={menus} />;

  // return (
  //   <div>
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
  //     <p>menus</p>
  //   </div>
  // );
});
