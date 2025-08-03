import { MinimizedWindow } from 'domains/window/interface';
import { getGenieAnimationTime } from 'domains/window/views/WindowControl/services/getGenieAnimationTime';
import { WINDOW_ANIMATION } from 'domains/window-animation/constant';
import { useMinimizingWindow } from 'domains/window-animation/store';
import {
  animate,
  interpolate,
  motion,
  useMotionValue,
  useTransform,
} from 'framer-motion';
import { useEffect } from 'react';
import { DockIconOpenIndicator } from '../DockIconOpenIndicator';
import { DOCK_ITEM_SIZE } from './constant';
import { DockItem } from './DockItem';
import * as styles from './DockItem.css';

interface WindowDockItemProps {
  id: string;
  src: string;
  mouseX: number | null;
  onClick?: () => void;
}

export function WindowDockItem({
  id,
  mouseX,
  src,
  onClick,
}: WindowDockItemProps) {
  const minimizingWindow = useMinimizingWindow(id);

  if (minimizingWindow != null) {
    return (
      <AnimatedWindowDockItem
        id={id}
        mouseX={mouseX}
        src={src}
        onClick={onClick}
        minimizedWindow={minimizingWindow}
      />
    );
  }

  return <DockItem mouseX={mouseX} src={src} onClick={onClick} />;
}

function AnimatedWindowDockItem({
  src,
  onClick,
  minimizedWindow,
}: WindowDockItemProps & { minimizedWindow: MinimizedWindow }) {
  const t = useMotionValue(0);
  const containerWidth = useTransform(() => DOCK_ITEM_SIZE * t.get());

  const { fillAnimationStart } = getGenieAnimationTime(
    minimizedWindow.window,
    minimizedWindow.target
  );
  const fillAnimationStartRatio =
    fillAnimationStart / WINDOW_ANIMATION.DURATION;

  const heightRatio = minimizedWindow.target.heightRatio;
  const paddingYRatio = (1 - heightRatio) / 2;
  const getClipPath = interpolate(
    [0, fillAnimationStartRatio, 1],
    [
      `inset(100% 0 0 0)`,
      `inset(${(1 - paddingYRatio) * 100}% 0 0 0)`,
      `inset(${paddingYRatio * 100}% 0 0 0)`,
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
