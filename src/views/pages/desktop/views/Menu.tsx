import { applications } from 'domains/apps/apps';
import { useFocusedWindow } from 'domains/window/store';
import { Fragment, memo } from 'react';

export function Menu() {
  const focusedWindow = useFocusedWindow();

  return <InnerMenu appID={focusedWindow?.appID || ''} />;
}

const InnerMenu = memo(({ appID }: { appID: string }) => {
  const menus = applications.get(appID)?.menus;
  return (
    <div>
      {menus?.map((menu) => (
        <Fragment key={menu.name}>
          <p>{menu.name}</p>
          {menu.submenuGroups.map((submenuGroup, index) => (
            <div key={index}>
              {submenuGroup.map((submenu) => (
                <button key={submenu.name}>{submenu.name}</button>
              ))}
            </div>
          ))}
        </Fragment>
      ))}
      <p>menus</p>
    </div>
  );
});
