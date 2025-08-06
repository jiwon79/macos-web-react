import { useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useCallback } from 'react';
import { useRaf } from 'utils/react/useRaf';
import { DOCK_ITEM } from '../views/DockItem/constant';

export const useDockItemSize = (params: {
  mouseX: number | null;
  element: HTMLElement | null | undefined;
  initialDistance?: number;
  onDistanceChange?: (distance: number) => void;
}) => {
  const { mouseX, element, initialDistance, onDistanceChange } = params;

  const distance = useMotionValue(initialDistance ?? BEYOND_THE_DISTANCE_LIMIT);
  const rawSize = useTransform(distance, DISTANCE_INPUT, SIZE_OUTPUT);
  const size = useSpring(rawSize, {
    stiffness: 1300,
    damping: 82,
  });

  const setDistance = useCallback(
    (newDistance: number) => {
      distance.set(newDistance);
      onDistanceChange?.(newDistance);
    },
    [distance, onDistanceChange]
  );

  useRaf(() => {
    if (element && mouseX !== null) {
      const rect = element.getBoundingClientRect();

      const imgCenterX = rect.left + rect.width / 2;

      const distanceDelta = mouseX - imgCenterX;
      setDistance(distanceDelta);
      return;
    }

    setDistance(BEYOND_THE_DISTANCE_LIMIT);
  });

  return size;
};

const DISTANCE_LIMIT = DOCK_ITEM.SIZE * 6;
const BEYOND_THE_DISTANCE_LIMIT = DISTANCE_LIMIT + 1;
const DISTANCE_INPUT = [
  -DISTANCE_LIMIT,
  -DISTANCE_LIMIT / 1.25,
  -DISTANCE_LIMIT / 2,
  0,
  DISTANCE_LIMIT / 2,
  DISTANCE_LIMIT / 1.25,
  DISTANCE_LIMIT,
];
const SIZE_OUTPUT = [
  DOCK_ITEM.SIZE * 1.0,
  DOCK_ITEM.SIZE * 1.1,
  DOCK_ITEM.SIZE * 1.414,
  DOCK_ITEM.SIZE * 2.0,
  DOCK_ITEM.SIZE * 1.414,
  DOCK_ITEM.SIZE * 1.1,
  DOCK_ITEM.SIZE * 1.0,
];
