import { DockIconOpenIndicator } from '../DockIconOpenIndicator/DockIconOpenIndicator';
import { item, icon, openIndicator } from './DockItem.css';

interface DockItemProps {
  src: string;
  open?: boolean;
}

export function DockItem({ open, src }: DockItemProps) {
  return (
    <div className={item}>
      <img className={icon} width={50} height={50} src={src} />
      <DockIconOpenIndicator className={openIndicator} open={open} />
    </div>
  );
}
