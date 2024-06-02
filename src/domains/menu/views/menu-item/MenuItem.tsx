import { MenuConfig } from 'domains/app/interface';
import { MenuBase } from '../menu-base';
import { item } from './MenuItem.css';
import {
  useDismiss,
  useFloating,
  useHover,
  useInteractions,
} from '@floating-ui/react';
import { FloatingMenu } from '../floating-menu';
import { useState } from 'react';

interface MenuItemProps {
  menu: MenuConfig;
  focused: boolean;
  selected: boolean;
  onSelectedChange: (selected: boolean) => void;
}

export function MenuItem({
  menu,
  focused,
  selected,
  onSelectedChange,
}: MenuItemProps) {
  const [open, setOpen] = useState(false);
  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: 'bottom-start',
  });

  const hover = useHover(context, { enabled: focused });
  const dismiss = useDismiss(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    dismiss,
  ]);

  return (
    <>
      <MenuBase
        name={menu.name}
        ref={refs.setReference}
        className={item}
        onClick={() => setOpen(!open)}
        focused={focused}
        selected={selected}
        onSelectedChange={onSelectedChange}
        {...getReferenceProps()}
      >
        {menu.name}
        {(selected || open) && (
          <FloatingMenu
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
          >
            {menu.submenuGroups.map((submenuGroup, index) => (
              <div
                key={index}
                style={{ display: 'flex', flexDirection: 'column' }}
              >
                {submenuGroup.map((submenu) => (
                  <button key={submenu.name}>{submenu.name}</button>
                ))}
              </div>
            ))}
          </FloatingMenu>
        )}
      </MenuBase>
    </>
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
