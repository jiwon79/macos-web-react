import { MinimizedWindow } from 'domains/window/interface';
import { getGenieAnimationTime } from 'domains/window/views/WindoeControl/services/getGenieAnimationTime';
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
  const getClipPath = interpolate(
    [0, fillAnimationStartRatio, 1],
    ['inset(100% 0 0 0)', 'inset(100% 0 0 0)', 'inset(0% 0 0 0)']
  );
  const clipPath = useTransform(() => getClipPath(t.get()));

  useEffect(() => {
    const animation = animate(t, 1, {
      duration: WINDOW_ANIMATION.DURATION / 1000,
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

// interface WindowDockItemProps {
//   id: string;
//   src: string;
//   mouseX: number | null;
//   onClick?: () => void;
// }

// export function WindowDockItem({
//   id,
//   mouseX,
//   src,
//   onClick,
// }: WindowDockItemProps) {
//   const minimizingWindow = useMinimizingWindow(id);
//   const animating = minimizingWindow != null;

//   const ref = useRef<HTMLImageElement>(null);
//   const size = useDockItemSize(mouseX, ref, DOCK_ITEM_SIZE);

//   const t = useMotionValue(0);
//   const scaleX = useTransform(() => (animating ? t.get() : undefined));
//   const containerWidth = useTransform(() =>
//     animating ? DOCK_ITEM_SIZE * t.get() : size.get()
//   );
//   const width = useTransform(() => (animating ? DOCK_ITEM_SIZE : size.get()));
//   const height = useTransform(() => (animating ? DOCK_ITEM_SIZE : size.get()));

//   const getClipPath = interpolate(
//     [0, 0.5, 1],
//     ['inset(100% 0 0 0)', 'inset(100% 0 0 0)', 'inset(0% 0 0 0)']
//   );
//   const clipPath = useTransform(() =>
//     animating ? getClipPath(t.get()) : undefined
//   );

//   useEffect(() => {
//     if (animating) {
//       const animation = animate(t, 1, {
//         duration: WINDOW_ANIMATION.DURATION / 1000,
//       });

//       return () => animation.stop();
//     } else {
//       t.set(0);
//     }
//   }, [animating, t]);

//   return (
//     <motion.div
//       className={styles.item}
//       style={{
//         width: containerWidth,
//       }}
//     >
//       <motion.img
//         ref={ref}
//         className={styles.icon}
//         src={src}
//         draggable={false}
//         style={{
//           width,
//           height,
//           clipPath,
//           scaleX,
//         }}
//         onClick={onClick}
//       />
//       <DockIconOpenIndicator className={styles.openIndicator} />
//     </motion.div>
//   );
// }
