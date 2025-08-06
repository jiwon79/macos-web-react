import { EMPTY_IMAGE_URL } from 'domains/dock/constant';
import { useDockItemSize } from 'domains/dock/hooks/useDockItemSize';
import { useDock } from 'domains/dock/store';
import { WINDOW_ANIMATION } from 'domains/window-animation/constant';
import { useWindowAnimationAction } from 'domains/window-animation/store';
import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import { useEffect } from 'react';
import { DockIconOpenIndicator } from '../DockIconOpenIndicator';
import * as styles from './DockItem.css';

interface RestoringWindowDockItemProps {
  windowId: string;
  onClick?: () => void;
  distance: number;
}

export function RestoringWindowDockItem({
  windowId,
  onClick,
  distance,
}: RestoringWindowDockItemProps) {
  const mouseX = useDock((state) => state.mouseX);
  const { getDockItemElement } = useWindowAnimationAction();
  const itemElement = getDockItemElement(windowId);
  const size = useDockItemSize({
    mouseX,
    element: itemElement,
    initialDistance: distance,
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
