import { Point } from 'domains/window/interface/Point';

export function getInterpolatedBezierPoints(
  P0: Point,
  P1: Point,
  P2: Point,
  P3: Point
): Point[] {
  // 1. 기본 베지어 곡선 생성 (LENGTH=100)
  const LENGTH = 100;
  const times = Array.from({ length: LENGTH + 1 }, (_, i) => i / LENGTH);
  const bezierPoints = times.map((t) => getBezierPoint(t, P0, P1, P2, P3));

  // 2. 모든 좌표를 반올림하여 정수로 변환
  const roundedPoints = bezierPoints.map((point) => ({
    x: Math.round(point.x),
    y: Math.round(point.y),
  }));

  // 3. y값 범위 계산
  const minY = Math.min(...roundedPoints.map((p) => p.y));
  const maxY = Math.max(...roundedPoints.map((p) => p.y));

  // 4. y값이 비어있는 구간들을 찾아서 보간
  const result: Point[] = [];

  for (let y = minY; y <= maxY; y++) {
    // TODO: O(n) -> O(1)
    // 현재 y값에 해당하는 점들 찾기
    const pointsAtY = roundedPoints.filter((p) => p.y === y);

    if (pointsAtY.length > 0) {
      // 해당 y값에 점이 있으면 추가
      result.push(pointsAtY[0]);
    } else {
      // 해당 y값에 점이 없으면 양옆 점들을 찾아서 보간
      const lowerPoints = roundedPoints.filter((p) => p.y < y);
      const upperPoints = roundedPoints.filter((p) => p.y > y);

      if (lowerPoints.length > 0 && upperPoints.length > 0) {
        // 가장 가까운 아래쪽과 위쪽 점 찾기
        const lowerPoint = lowerPoints.reduce((prev, curr) =>
          prev.y > curr.y ? prev : curr
        );
        const upperPoint = upperPoints.reduce((prev, curr) =>
          prev.y < curr.y ? prev : curr
        );

        // 선형 보간으로 x값 계산
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
    y: mt3 * P0.y + 3 * mt2 * t * P1.y + 3 * mt * t2 * P2.y + t3 * P3.y,
  };
}

export function createCubicBezierFunction(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  epsilon = 1e-6
) {
  return (xTarget: number) => {
    if (xTarget === 0) {
      return 0;
    }

    if (xTarget === 1) {
      return 1;
    }

    let low = 0;
    let high = 1;
    let t = 0;
    while (low < high) {
      t = (low + high) / 2;
      const x = cubicBezier(t, 0, x1, x2, 1);
      if (Math.abs(x - xTarget) < epsilon) {
        break;
      }
      if (x < xTarget) {
        low = t;
      } else {
        high = t;
      }
    }
    const y = cubicBezier(t, 0, y1, y2, 1);
    return y;
  };
}

function cubicBezier(
  t: number,
  p0: number,
  p1: number,
  p2: number,
  p3: number
) {
  return (
    (1 - t) ** 3 * p0 +
    3 * (1 - t) ** 2 * t * p1 +
    3 * (1 - t) * t ** 2 * p2 +
    t ** 3 * p3
  );
}

export const easeInOutCubicBezier = createCubicBezierFunction(0.42, 0, 0.58, 1);
export const easeOutCubicBezier = createCubicBezierFunction(0, 0, 0.58, 1);
