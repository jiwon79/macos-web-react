import { interpolate, Point } from 'utils/math';

export function getWindowBezierControlPoints(
  P0: Point,
  P3: Point
): [Point, Point] {
  const FIRST_CONTROL_RATE_X = 0.08;
  const FIRST_CONTROL_RATE_Y = 0.38;
  const firstControlPoint: Point = {
    x: interpolate(P0.x, P3.x)(FIRST_CONTROL_RATE_X),
    y: interpolate(P0.y, P3.y)(FIRST_CONTROL_RATE_Y),
  };

  const SECOND_CONTROL_RATE_X = 0.94;
  const SECOND_CONTROL_RATE_Y = 0.62;
  const secondControlPoint: Point = {
    x: interpolate(P0.x, P3.x)(SECOND_CONTROL_RATE_X),
    y: interpolate(P0.y, P3.y)(SECOND_CONTROL_RATE_Y),
  };

  return [firstControlPoint, secondControlPoint];
}
