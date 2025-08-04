import { DOCK_ITEM } from 'domains/dock/constant';
import { createDockItemImageUrl } from 'domains/dock/services/createDockItemImageUrl';
import { getDockItemInnerRect } from 'domains/dock/services/getDockItemInnerRect';
import { MinimizedWindow } from 'domains/window/interface';
import { WINDOW_ANIMATION } from 'domains/window-animation/constant';
import { getGenieAnimationTime } from 'domains/window-animation/services/getGenieAnimationTime';
import { useMinimizingWindow } from 'domains/window-animation/store';
import {
  animate,
  interpolate,
  motion,
  useMotionValue,
  useTransform,
} from 'framer-motion';
import { useEffect, useMemo } from 'react';
import { DockIconOpenIndicator } from '../DockIconOpenIndicator';
import { DOCK_ITEM_SIZE } from './constant';
import { DockItem } from './DockItem';
import * as styles from './DockItem.css';

interface WindowDockItemProps {
  id: string;
  imageData: ImageData;
  mouseX: number | null;
  onClick?: () => void;
}

export function WindowDockItem({
  id,
  mouseX,
  imageData,
  onClick,
}: WindowDockItemProps) {
  const minimizingWindow = useMinimizingWindow(id);
  const src = useMemo(() => createDockItemImageUrl(imageData), [imageData]);

  if (minimizingWindow != null) {
    return (
      <AnimatedWindowDockItem
        src={src ?? ''}
        onClick={onClick}
        minimizedWindow={minimizingWindow}
      />
    );
  }

  return <DockItem mouseX={mouseX} src={src ?? ''} onClick={onClick} />;
}

function AnimatedWindowDockItem({
  src,
  onClick,
  minimizedWindow,
}: {
  src: string;
  onClick?: () => void;
  minimizedWindow: MinimizedWindow;
}) {
  const t = useMotionValue(0);
  const containerWidth = useTransform(() => DOCK_ITEM_SIZE * t.get());

  const { fillAnimationStart } = getGenieAnimationTime(
    minimizedWindow.window,
    minimizedWindow.target
  );
  const fillAnimationStartRatio =
    fillAnimationStart / WINDOW_ANIMATION.DURATION;

  const innerRect = getDockItemInnerRect(minimizedWindow.imageData);
  const innerYRatio = innerRect.y / DOCK_ITEM.SIZE;
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
      className={styles.item}
      style={{
        width: containerWidth,
      }}
    >
      <motion.img
        className={styles.icon}
        src={src}
        draggable={false}
        style={{
          width: DOCK_ITEM_SIZE,
          height: DOCK_ITEM_SIZE,
          clipPath,
          scaleX: t,
        }}
        onClick={onClick}
      />
      <DockIconOpenIndicator className={styles.openIndicator} />
    </motion.div>
  );
}
