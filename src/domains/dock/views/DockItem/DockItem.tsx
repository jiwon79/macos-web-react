import { useDockItemSize } from "domains/dock/hooks/useDockItemSize";
import { useDock } from "domains/dock/store";
import { motion } from "framer-motion";
import { useRef } from "react";
import { DockIconOpenIndicator } from "../DockIconOpenIndicator";
import * as styles from "./DockItem.css";

interface DockItemProps {
  src: string;
  open?: boolean;
  onClick?: () => void;
  initialDistance?: number;
  onDistanceChange?: (distance: number) => void;
}

export function DockItem({
  open,
  src,
  onClick,
  initialDistance,
  onDistanceChange
}: DockItemProps) {
  const ref = useRef<HTMLImageElement>(null);
  const mouseX = useDock((state) => state.mouseX);
  const size = useDockItemSize({
    mouseX,
    element: ref.current,
    initialDistance,
    onDistanceChange
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
          height: size
        }}
        onClick={onClick}
      />
      <DockIconOpenIndicator className={styles.openIndicator} open={open} />
    </div>
  );
}
