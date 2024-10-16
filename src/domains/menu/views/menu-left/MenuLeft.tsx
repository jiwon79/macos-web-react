import { MenuConfig } from 'domains/app/interface';
import useFocusMenu from 'domains/menu/hooks/useFocusMenu';
import { useState } from 'react';
import { MenuAppleLogo } from './components';
import { MenuItem } from './components/menu-item';
import { contianer } from './MenuLeft.css';

interface MenuLeftProps {
  menus: MenuConfig[];
}

export function MenuLeft({ menus }: MenuLeftProps) {
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);
  const { focused, menuRef } = useFocusMenu({
    onFocusChange: (focused) => !focused && setSelectedMenu(null),
  });

  const onSelectedChange = (selected: boolean, name: string) => {
    if (selected) {
      setSelectedMenu(name);
    } else {
      setSelectedMenu(null);
    }
  };

  return (
    <div ref={menuRef} className={contianer}>
      <MenuAppleLogo
        focused={focused}
        selected={selectedMenu === 'Apple'}
        onSelectedChange={(selected) => onSelectedChange(selected, 'Apple')}
      />
      {menus.map((menu, index) => {
        return (
          <MenuItem
            type={index === 0 ? 'text-bold' : 'text'}
            key={menu.name + index}
            menu={menu}
            focused={focused}
            selected={menu.name === selectedMenu}
            onSelectedChange={(selected) =>
              onSelectedChange(selected, menu.name)
            }
          />
        );
      })}
    </div>
  );
}
