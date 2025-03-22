import { useDockHoverAnimation } from 'domains/dock/hooks';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { DockIconOpenIndicator } from '../DockIconOpenIndicator';
import { icon, item, openIndicator } from './DockItem.css';

interface DockItemProps {
  src: string;
  mouseX: number | null;
  open?: boolean;
  onClick?: () => void;
}

export function DockItem({ open, mouseX, src, onClick }: DockItemProps) {
  const ref = useRef<HTMLImageElement>(null);
  const { size } = useDockHoverAnimation(mouseX, ref);

  return (
    <div className={item}>
      <motion.img
        ref={ref}
        className={icon}
        src={src}
        draggable={false}
        style={{ width: size, height: size }}
        onClick={onClick}
      />
      <DockIconOpenIndicator className={openIndicator} open={open} />
    </div>
  );
}
