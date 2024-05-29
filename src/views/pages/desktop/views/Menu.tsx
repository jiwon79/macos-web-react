import { applications } from 'domains/app/applications';
import { useFocusedWindow } from 'domains/window/store';
import { Fragment, memo } from 'react';

export function Menu() {
  const focusedWindow = useFocusedWindow();

  return <InnerMenu appID={focusedWindow?.appID || 'Finder'} />;
}

const InnerMenu = memo(({ appID }: { appID: string }) => {
  const app = applications.get(appID);

  if (app == null) {
    return;
  }

  return (
    <div>
      {app.menus.map((menu) => (
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
