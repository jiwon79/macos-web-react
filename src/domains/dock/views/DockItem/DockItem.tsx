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
  style?: React.CSSProperties;
}

const ITEM_BASE_SIZE = 50;
const ANIMATION_DURATION = 2000;

export function DockItem({
  open,
  mouseX,
  src,
  onClick,
  isAnimating,
  style,
}: DockItemProps) {
  const ref = useRef<HTMLImageElement>(null);
  const { scale } = useDockHoverAnimation(mouseX, ref, ITEM_BASE_SIZE);

  const size = useTransform(() => ITEM_BASE_SIZE * scale.get());

  const t = useMotionValue(0);
  const minimizedWidth = useTransform(
    t,
    [0, ANIMATION_DURATION],
    [0, ITEM_BASE_SIZE]
  );
  const width = useTransform(() =>
    isAnimating ? ITEM_BASE_SIZE * minimizedWidth.get() : size.get()
  );
  const height = useTransform(() =>
    isAnimating ? ITEM_BASE_SIZE : size.get()
  );

  // 아래에서 위로 보이는 애니메이션을 위한 clip-path
  const clipPathValue = useTransform(
    t,
    [0, ANIMATION_DURATION / 2, ANIMATION_DURATION],
    ['inset(100% 0 0 0)', 'inset(100% 0 0 0)', 'inset(0% 0 0 0)']
  );
  const clipPath = useTransform(() =>
    isAnimating ? clipPathValue.get() : undefined
  );

  useEffect(() => {
    if (isAnimating) {
      const animation = animate(t, ANIMATION_DURATION, {
        duration: ANIMATION_DURATION / 1000,
      });

      return () => animation.stop();
    } else {
      t.set(0);
    }
  }, [isAnimating, t]);

  return (
    <div className={styles.item} style={style}>
      <motion.img
        ref={ref}
        className={styles.icon}
        src={src}
        draggable={false}
        style={{
          width,
          height,
          clipPath,
        }}
        onClick={onClick}
      />
      <DockIconOpenIndicator className={styles.openIndicator} open={open} />
    </div>
  );
}
