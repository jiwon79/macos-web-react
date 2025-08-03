// NOTE: https://github.com/motiondivision/motion/blob/e0f7e07570e281b8932c897afb5f6a348c7f97de/packages/motion-utils/src/easing/cubic-bezier.ts

// Returns x(t) given t, x1, and x2, or y(t) given t, y1, and y2.
const calcBezier = (t: number, a1: number, a2: number) =>
  (((1.0 - 3.0 * a2 + 3.0 * a1) * t + (3.0 * a2 - 6.0 * a1)) * t + 3.0 * a1) *
  t;

const subdivisionPrecision = 0.0000001;
const subdivisionMaxIterations = 12;

function binarySubdivide(
  x: number,
  lowerBound: number,
  upperBound: number,
  mX1: number,
  mX2: number
) {
  let currentX: number;
  let currentT: number;
  let i: number = 0;

  do {
    currentT = lowerBound + (upperBound - lowerBound) / 2.0;
    currentX = calcBezier(currentT, mX1, mX2) - x;
    if (currentX > 0.0) {
      upperBound = currentT;
    } else {
      lowerBound = currentT;
    }
  } while (
    Math.abs(currentX) > subdivisionPrecision &&
    ++i < subdivisionMaxIterations
  );

  return currentT;
}

export function cubicBezier(
  mX1: number,
  mY1: number,
  mX2: number,
  mY2: number
) {
  // If this is a linear gradient, return linear easing
  if (mX1 === mY1 && mX2 === mY2) {
    return (t: number) => t;
  }

  const getTForX = (aX: number) => binarySubdivide(aX, 0, 1, mX1, mX2);

  // If animation is at start/end, return t without easing
  return (t: number) =>
    t === 0 || t === 1 ? t : calcBezier(getTForX(t), mY1, mY2);
}

export const easeIn = cubicBezier(0.42, 0, 1, 1);
export const easeOut = cubicBezier(0, 0, 0.58, 1);
export const easeInOut = cubicBezier(0.42, 0, 0.58, 1);

export const getEaseInOutTForY = (y: number) => binarySubdivide(y, 0, 1, 0, 1);
