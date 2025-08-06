import type { Point } from "utils/math";
import { getInterpolatedBezierPoints } from "./getInterpolatedBezierPoints";
import { getWindowBezierControlPoints } from "./getWindowBezierControlPoints";

export function getWindowInterpolatedBezierPoints(
  start: Point,
  end: Point
): Point[] {
  const [firstControl, secondControl] = getWindowBezierControlPoints(
    start,
    end
  );

  return getInterpolatedBezierPoints(start, firstControl, secondControl, end);
}
