import type { Point } from "domains/window/interface/Point";

export function getInterpolatedBezierPoints(
  P0: Point,
  P1: Point,
  P2: Point,
  P3: Point
): Point[] {
  const LENGTH = 100;
  const times = Array.from({ length: LENGTH + 1 }, (_, i) => i / LENGTH);
  const bezierPoints = times.map((t) => getBezierPoint(t, P0, P1, P2, P3));

  const roundedPoints = bezierPoints.map((point) => ({
    x: Math.round(point.x),
    y: Math.round(point.y)
  }));

  const minY = Math.min(...roundedPoints.map((p) => p.y));
  const maxY = Math.max(...roundedPoints.map((p) => p.y));

  const result: Point[] = [];

  for (let y = minY; y <= maxY; y++) {
    // TODO: O(n) -> O(1)
    const pointsAtY = roundedPoints.filter((p) => p.y === y);

    if (pointsAtY.length > 0) {
      result.push(pointsAtY[0]);
    } else {
      const lowerPoints = roundedPoints.filter((p) => p.y < y);
      const upperPoints = roundedPoints.filter((p) => p.y > y);

      if (lowerPoints.length > 0 && upperPoints.length > 0) {
        const lowerPoint = lowerPoints.reduce((prev, curr) =>
          prev.y > curr.y ? prev : curr
        );
        const upperPoint = upperPoints.reduce((prev, curr) =>
          prev.y < curr.y ? prev : curr
        );

        const ratio = (y - lowerPoint.y) / (upperPoint.y - lowerPoint.y);
        const interpolatedX = Math.round(
          lowerPoint.x + ratio * (upperPoint.x - lowerPoint.x)
        );

        result.push({ x: interpolatedX, y });
      }
    }
  }

  return result;
}

function getBezierPoint(
  t: number,
  P0: Point,
  P1: Point,
  P2: Point,
  P3: Point
): Point {
  const t2 = t * t;
  const t3 = t2 * t;
  const mt = 1 - t;
  const mt2 = mt * mt;
  const mt3 = mt2 * mt;

  return {
    x: mt3 * P0.x + 3 * mt2 * t * P1.x + 3 * mt * t2 * P2.x + t3 * P3.x,
    y: mt3 * P0.y + 3 * mt2 * t * P1.y + 3 * mt * t2 * P2.y + t3 * P3.y
  };
}
