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
  const minimizedWidth = useTransform(t, [0, 1], [0, ITEM_BASE_SIZE]);
  const width = useTransform(() =>
    isAnimating ? minimizedWidth.get() : size.get()
  );

  useEffect(() => {
    if (isAnimating) {
      // 1부터 0까지 1.5초 동안 애니메이션 (width: 50 -> 0)
      const animation = animate(t, 1, {
        duration: 1.5,
        ease: 'easeOut',
      });

      return () => animation.stop();
    } else {
      // 애니메이션이 끝나면 즉시 1로 리셋 (width: 50으로 복원)
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
          height: size,
        }}
        onClick={onClick}
      />
      <DockIconOpenIndicator className={styles.openIndicator} open={open} />
    </div>
  );
}
