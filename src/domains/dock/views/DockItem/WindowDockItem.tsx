import { DOCK_ITEM } from 'domains/dock/constant';
import { createDockItemImageUrl } from 'domains/dock/services/createDockItemImageUrl';
import { getDockItemInnerRect } from 'domains/dock/services/getDockItemInnerRect';
import { MinimizedWindow } from 'domains/window/interface';
import { WINDOW_ANIMATION } from 'domains/window-animation/constant';
import { getGenieAnimationTime } from 'domains/window-animation/services/getGenieAnimationTime';
import {
  useMaximizingWindow,
  useMinimizingWindow,
} from 'domains/window-animation/store';
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
  const maximizingWindow = useMaximizingWindow(id);
  const src = useMemo(() => createDockItemImageUrl(imageData), [imageData]);

  if (minimizingWindow != null) {
    return (
      <MinimizingWindowDockItem
        src={src ?? ''}
        onClick={onClick}
        minimizedWindow={minimizingWindow}
        minimize={false}
      />
    );
  }

  if (maximizingWindow != null) {
    return <MaximizingWindowDockItem src={src ?? ''} onClick={onClick} />;
  }

  return <DockItem mouseX={mouseX} src={src ?? ''} onClick={onClick} />;
}

function MinimizingWindowDockItem({
  src,
  onClick,
  minimizedWindow,
  minimize,
}: {
  src: string;
  onClick?: () => void;
  minimizedWindow: MinimizedWindow;
  minimize: boolean;
}) {
  const t = useMotionValue(minimize ? 1 : 0);
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
    const animation = animate(t, minimize ? 0 : 1, {
      duration: WINDOW_ANIMATION.DURATION / 1000,
      ease: 'linear',
    });

    return () => animation.stop();
  }, [t, minimize]);

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
          clipPath: minimize ? undefined : clipPath,
          scaleX: t,
          opacity: minimize ? 0 : 1,
        }}
        onClick={onClick}
      />
      <DockIconOpenIndicator className={styles.openIndicator} />
    </motion.div>
  );
}

function MaximizingWindowDockItem({
  src,
  onClick,
}: {
  src: string;
  onClick?: () => void;
}) {
  const t = useMotionValue(1);
  const containerWidth = useTransform(() => DOCK_ITEM_SIZE * t.get());

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
          scaleX: t,
        }}
        onClick={onClick}
      />
      <DockIconOpenIndicator className={styles.openIndicator} />
    </motion.div>
  );
}
