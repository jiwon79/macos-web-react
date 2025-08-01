import { useDockItemSize } from 'domains/dock/hooks/useDockItemSize';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { DockIconOpenIndicator } from '../DockIconOpenIndicator';
import { DOCK_ITEM_SIZE } from './constant';
import * as styles from './DockItem.css';

interface DockItemProps {
  src: string;
  mouseX: number | null;
  open?: boolean;
  onClick?: () => void;
}

export function DockItem({ open, mouseX, src, onClick }: DockItemProps) {
  const ref = useRef<HTMLImageElement>(null);
  const size = useDockItemSize(mouseX, ref, DOCK_ITEM_SIZE);

  return (
    <div className={styles.item}>
      <motion.img
        ref={ref}
        className={styles.icon}
        src={src}
        draggable={false}
        style={{
          width: size,
          height: size,
        }}
        onClick={onClick}
      />
      <DockIconOpenIndicator className={styles.openIndicator} open={open} />
    </div>
  );
}
