import { useDockItemSize } from 'domains/dock/hooks/useDockItemSize';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { DockIconOpenIndicator } from '../DockIconOpenIndicator';
import * as styles from './DockItem.css';

interface DockItemProps {
  src: string;
  mouseX: number | null;
  open?: boolean;
  onClick?: () => void;
  onDistanceChange?: (distance: number) => void;
}

export function DockItem({
  open,
  mouseX,
  src,
  onClick,
  onDistanceChange,
}: DockItemProps) {
  const ref = useRef<HTMLImageElement>(null);
  const size = useDockItemSize({
    mouseX,
    element: ref.current,
    onDistanceChange,
  });

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
