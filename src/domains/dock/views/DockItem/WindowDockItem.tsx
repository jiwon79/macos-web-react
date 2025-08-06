import { useDockItemSize } from 'domains/dock/hooks/useDockItemSize';
import { createDockItemImageUrl } from 'domains/dock/services/createDockItemImageUrl';
import { getDockItemInnerRectRatio } from 'domains/dock/services/getDockItemInnerRectRatio';
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
import { useEffect, useMemo, useRef, useState } from 'react';
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
          id={id}
          mouseX={mouseX}
          src={src ?? ''}
          onClick={onClick}
          minimizedWindow={minimizingWindow}
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
  id,
  mouseX,
  src,
  onClick,
  minimizedWindow,
}: {
  id: string;
  mouseX: number | null;
  src: string;
  onClick?: () => void;
  minimizedWindow: MinimizedWindow;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const { getDockItemElement } = useWindowAnimationAction();
  const itemRef = getDockItemElement(id);
  const size = useDockItemSize({
    mouseX,
    element: itemRef,
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
          clipPath,
          scaleX: t,
          translateX,
          boxShadow: 'inset 0 0 0 1px red',
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
        boxShadow: 'inset 0 0 0 1px blue',
      }}
    >
      <motion.img
        className={styles.icon}
        draggable={false}
        src={EMPTY_IMAGE_URL}
        style={{
          width: size,
          height: size,
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
