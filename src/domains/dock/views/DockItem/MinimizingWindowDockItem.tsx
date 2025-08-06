import { useDockItemSize } from 'domains/dock/hooks/useDockItemSize';
import { getDockItemInnerRectRatio } from 'domains/dock/services/getDockItemInnerRectRatio';
import { useDock } from 'domains/dock/store';
import { MinimizedWindow } from 'domains/window/interface';
import { WINDOW_ANIMATION } from 'domains/window-animation/constant';
import { getGenieAnimationTime } from 'domains/window-animation/services/getGenieAnimationTime';
import { useWindowAnimationAction } from 'domains/window-animation/store';
import {
  animate,
  interpolate,
  motion,
  useMotionValue,
  useTransform,
} from 'framer-motion';
import { useEffect, useRef } from 'react';
import { DockIconOpenIndicator } from '../DockIconOpenIndicator';
import * as styles from './DockItem.css';

interface MinimizingWindowDockItemProps {
  windowId: string;
  src: string;
  onClick?: () => void;
  minimizedWindow: MinimizedWindow;
  onDistanceChange: (distance: number) => void;
}

export function MinimizingWindowDockItem({
  windowId,
  src,
  onClick,
  minimizedWindow,
  onDistanceChange,
}: MinimizingWindowDockItemProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const mouseX = useDock((state) => state.mouseX);
  const { getDockItemElement } = useWindowAnimationAction();
  const itemElement = getDockItemElement(windowId);
  const size = useDockItemSize({
    mouseX,
    element: itemElement,
    onDistanceChange,
  });

  const t = useMotionValue(0);
  const containerWidth = useTransform(() => size.get() * t.get());
  const translateX = useTransform(() => (-size.get() * (1 - t.get())) / 2);

  const { fillAnimationStart } = getGenieAnimationTime(
    minimizedWindow.window,
    minimizedWindow.target.y
  );
  const fillAnimationStartRatio =
    fillAnimationStart / WINDOW_ANIMATION.DURATION;

  const innerYRatio = getDockItemInnerRectRatio(minimizedWindow.imageData).y;
  const getClipPath = interpolate(
    [0, fillAnimationStartRatio, 1],
    [
      `inset(100% 0 0 0)`,
      `inset(${(1 - innerYRatio) * 100}% 0 0 0)`,
      `inset(${innerYRatio * 100}% 0 0 0)`,
    ]
  );

  const clipPath = useTransform(() => getClipPath(t.get()));

  useEffect(() => {
    const animation = animate(t, 1, {
      duration: WINDOW_ANIMATION.DURATION / 1000,
      ease: 'linear',
    });

    return () => animation.stop();
  }, [t]);

  return (
    <motion.div
      ref={containerRef}
      className={styles.item}
      style={{
        width: containerWidth,
        boxShadow: 'inset 0 0 0 1px blue',
      }}
    >
      <motion.img
        ref={imageRef}
        className={styles.icon}
        src={src}
        draggable={false}
        style={{
          width: size,
          height: size,
          scaleX: t,
          translateX,
          clipPath,
          boxShadow: 'inset 0 0 0 1px red',
        }}
        onClick={onClick}
      />
      <DockIconOpenIndicator className={styles.openIndicator} />
    </motion.div>
  );
}
