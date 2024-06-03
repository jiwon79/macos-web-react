import { SubmenuConfig } from 'domains/app/interface';

interface SubMenusProps {
  submenuGroups: SubmenuConfig[][];
}

export function SubmenuGroups({ submenuGroups }: SubMenusProps) {
  return (
    <>
      {submenuGroups.map((submenuGroup, index) => (
        <div key={index} style={{ display: 'flex', flexDirection: 'column' }}>
          {submenuGroup.map((submenu) => (
            <button key={submenu.name}>{submenu.name}</button>
          ))}
        </div>
      ))}
    </>
  );
}
