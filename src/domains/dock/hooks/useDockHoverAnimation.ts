import {
  useMotionValue,
  MotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { RefObject } from 'react';
import { useRaf } from 'utils/react/useRaf';

export const useDockHoverAnimation = (
  mouseX: number | null,
  ref: RefObject<HTMLImageElement>
) => {
  const distance = useMotionValue(beyondTheDistanceLimit);

  const pixelSize: MotionValue<number> = useSpring(
    useTransform(distance, distanceInput, widthOutput),
    {
      stiffness: 1300,
      damping: 82,
    }
  );

  const remSize = useTransform(pixelSize, (width) => `${width / 16}rem`);

  useRaf(() => {
    const el = ref.current;
    if (el && mouseX !== null) {
      const rect = el.getBoundingClientRect();

      const imgCenterX = rect.left + rect.width / 2;

      const distanceDelta = mouseX - imgCenterX;
      distance.set(distanceDelta);
      return;
    }

    distance.set(beyondTheDistanceLimit);
  });

  return { size: remSize };
};

const baseWidth = 50;
const distanceLimit = baseWidth * 6;
const beyondTheDistanceLimit = distanceLimit + 1;
const distanceInput = [
  -distanceLimit,
  -distanceLimit / 1.25,
  -distanceLimit / 2,
  0,
  distanceLimit / 2,
  distanceLimit / 1.25,
  distanceLimit,
];
const widthOutput = [
  baseWidth,
  baseWidth * 1.1,
  baseWidth * 1.414,
  baseWidth * 2,
  baseWidth * 1.414,
  baseWidth * 1.1,
  baseWidth,
];
