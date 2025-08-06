import { useDockItemSize } from 'domains/dock/hooks/useDockItemSize';
import { createDockItemImageUrl } from 'domains/dock/services/createDockItemImageUrl';
import { getDockItemInnerRect } from 'domains/dock/services/getDockItemInnerRect';
import { DOCK_ITEM } from 'domains/dock/views/DockItem/constant';
import { MinimizedWindow } from 'domains/window/interface';
import { WINDOW_ANIMATION } from 'domains/window-animation/constant';
import { getGenieAnimationTime } from 'domains/window-animation/services/getGenieAnimationTime';
import {
  useMaximizingWindow,
  useMinimizingWindow,
  useWindowAnimationAction,
} from 'domains/window-animation/store';
import {
  animate,
  interpolate,
  motion,
  useMotionValue,
  useTransform,
} from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { DockIconOpenIndicator } from '../DockIconOpenIndicator';
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
  const { setDockItemElement } = useWindowAnimationAction();

  const src = useMemo(() => createDockItemImageUrl(imageData), [imageData]);
  const [distance, setDistance] = useState(100_000);

  if (minimizingWindow != null) {
    return (
      <div ref={(el) => setDockItemElement(id, el)}>
        <MinimizingWindowDockItem
          mouseX={mouseX}
          src={src ?? ''}
          onClick={onClick}
          minimizedWindow={minimizingWindow}
          minimize={false}
        />
      </div>
    );
  }

  if (maximizingWindow != null) {
    return (
      <div ref={(el) => setDockItemElement(id, el)}>
        <RestoreMinimizingWindowDockItem
          id={id}
          mouseX={mouseX}
          onClick={onClick}
          initialDistance={distance}
        />
      </div>
    );
  }

  return (
    <div ref={(el) => setDockItemElement(id, el)}>
      <DockItem
        mouseX={mouseX}
        src={src ?? ''}
        onClick={onClick}
        onDistanceChange={setDistance}
      />
    </div>
  );
}

function MinimizingWindowDockItem({
  mouseX,
  src,
  onClick,
  minimizedWindow,
  minimize,
}: {
  mouseX: number | null;
  src: string;
  onClick?: () => void;
  minimizedWindow: MinimizedWindow;
  minimize: boolean;
}) {
  const t = useMotionValue(minimize ? 1 : 0);
  const containerWidth = useTransform(() => DOCK_ITEM.SIZE * t.get());

  const { fillAnimationStart } = getGenieAnimationTime(
    minimizedWindow.window,
    minimizedWindow.target.y
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

function RestoreMinimizingWindowDockItem({
  id,
  mouseX,
  onClick,
  initialDistance,
}: {
  id: string;
  mouseX: number | null;
  onClick?: () => void;
  initialDistance: number;
}) {
  const { getDockItemElement } = useWindowAnimationAction();
  const itemRef = getDockItemElement(id);
  const size = useDockItemSize({
    mouseX,
    element: itemRef,
    initialDistance,
  });

  const t = useMotionValue(1);
  const containerWidth = useTransform(() => size.get() * t.get());

  useEffect(() => {
    const animation = animate(t, 0, {
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
        draggable={false}
        src={EMPTY_IMAGE_URL}
        style={{
          width: size,
          scaleX: t,
        }}
        onClick={onClick}
      />
      <DockIconOpenIndicator className={styles.openIndicator} />
    </motion.div>
  );
}

const EMPTY_IMAGE_URL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMBgKgdxsUAAAAASUVORK5CYII=';
