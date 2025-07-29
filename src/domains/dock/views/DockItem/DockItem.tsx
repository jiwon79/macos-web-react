import { useDockHoverAnimation } from 'domains/dock/hooks';
import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { DockIconOpenIndicator } from '../DockIconOpenIndicator';
import { icon, item, openIndicator } from './DockItem.css';

interface DockItemProps {
  src: string;
  mouseX: number | null;
  open?: boolean;
  onClick?: () => void;
  isAnimating?: boolean;
}

const ITEM_BASE_SIZE = 50;

export function DockItem({
  open,
  mouseX,
  src,
  onClick,
  isAnimating,
}: DockItemProps) {
  const ref = useRef<HTMLImageElement>(null);
  const { scale } = useDockHoverAnimation(mouseX, ref, ITEM_BASE_SIZE);

  const size = useTransform(() => ITEM_BASE_SIZE * scale.get());

  const t = useMotionValue(0);
  const minimizedWidth = useTransform(() => ITEM_BASE_SIZE * t.get());
  console.log(src, isAnimating, scale.get(), size.get(), minimizedWidth.get());

  useEffect(() => {
    if (isAnimating) {
      // 0부터 1까지 1.5초 동안 애니메이션
      const animation = animate(t, 1, {
        duration: 1.5,
        ease: 'easeOut',
      });

      return () => animation.stop();
    } else {
      // 애니메이션이 끝나면 즉시 0으로 리셋
      t.set(0);
    }
  }, [isAnimating, t]);

  return (
    <div className={item}>
      <motion.img
        ref={ref}
        className={icon}
        src={src}
        draggable={false}
        style={{
          width: isAnimating ? minimizedWidth : size,
          height: size,
        }}
        onClick={onClick}
      />
      <DockIconOpenIndicator className={openIndicator} open={open} />
    </div>
  );
}
