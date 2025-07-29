import {
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { RefObject } from 'react';
import { useRaf } from 'utils/react/useRaf';

export const useDockHoverAnimation = (
  mouseX: number | null,
  ref: RefObject<HTMLImageElement>,
  baseSize: number
) => {
  const DISTANCE_LIMIT = baseSize * 6;
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
  const SCALE_OUTPUT = [1.0, 1.1, 1.414, 2.0, 1.414, 1.1, 1.0];

  const distance = useMotionValue(BEYOND_THE_DISTANCE_LIMIT);
  const rawScale = useTransform(distance, DISTANCE_INPUT, SCALE_OUTPUT);
  const scale: MotionValue<number> = useSpring(rawScale, {
    stiffness: 1300,
    damping: 82,
  });

  useRaf(() => {
    const el = ref.current;
    if (el && mouseX !== null) {
      const rect = el.getBoundingClientRect();

      const imgCenterX = rect.left + rect.width / 2;

      const distanceDelta = mouseX - imgCenterX;
      distance.set(distanceDelta);
      return;
    }

    distance.set(BEYOND_THE_DISTANCE_LIMIT);
  });

  return { scale };
};
