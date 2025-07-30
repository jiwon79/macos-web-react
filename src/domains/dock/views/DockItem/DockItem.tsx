import { useDockHoverAnimation } from 'domains/dock/hooks';
import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { DockIconOpenIndicator } from '../DockIconOpenIndicator';
import * as styles from './DockItem.css';

interface DockItemProps {
  src: string;
  mouseX: number | null;
  open?: boolean;
  onClick?: () => void;
  isAnimating?: boolean;
}

export const DOCK_ITEM_SIZE = 50;
const ANIMATION_DURATION = 2000;

export function DockItem({
  open,
  mouseX,
  src,
  onClick,
  isAnimating,
}: DockItemProps) {
  const ref = useRef<HTMLImageElement>(null);
  const { scale } = useDockHoverAnimation(mouseX, ref, DOCK_ITEM_SIZE);

  const size = useTransform(() => DOCK_ITEM_SIZE * scale.get());

  const t = useMotionValue(0);
  const scaleX = useTransform(() => (isAnimating ? t.get() : undefined));
  const containerWidth = useTransform(() =>
    isAnimating ? DOCK_ITEM_SIZE * t.get() : size.get()
  );
  const width = useTransform(() => (isAnimating ? DOCK_ITEM_SIZE : size.get()));
  const height = useTransform(() =>
    isAnimating ? DOCK_ITEM_SIZE : size.get()
  );

  const clipPathValue = useTransform(
    t,
    [0, 0.5, 1],
    ['inset(100% 0 0 0)', 'inset(100% 0 0 0)', 'inset(0% 0 0 0)']
  );
  const clipPath = useTransform(() =>
    isAnimating ? clipPathValue.get() : undefined
  );

  useEffect(() => {
    if (isAnimating) {
      const animation = animate(t, 1, {
        duration: ANIMATION_DURATION / 1000,
      });

      return () => animation.stop();
    } else {
      t.set(0);
    }
  }, [isAnimating, t]);

  return (
    <motion.div
      className={styles.item}
      style={{
        width: containerWidth,
      }}
    >
      <motion.img
        ref={ref}
        className={styles.icon}
        src={src}
        draggable={false}
        style={{
          width,
          height,
          clipPath,
          scaleX,
        }}
        onClick={onClick}
      />
      <DockIconOpenIndicator className={styles.openIndicator} open={open} />
    </motion.div>
  );
}
