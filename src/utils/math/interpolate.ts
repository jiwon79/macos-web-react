import type { Point } from "./interface";

export function interpolate(v1: Point, v2: Point): (t: number) => Point;
export function interpolate(v1: number, v2: number): (t: number) => number;
export function interpolate(
  v1: Point | number,
  v2: Point | number
): (t: number) => Point | number {
  if (typeof v1 === "number" && typeof v2 === "number") {
    return (t: number) => v1 * (1 - t) + v2 * t;
  }

  if (
    typeof v1 === "object" &&
    typeof v2 === "object" &&
    "x" in v1 &&
    "y" in v1 &&
    "x" in v2 &&
    "y" in v2
  ) {
    return (t: number) => ({
      x: v1.x * (1 - t) + v2.x * t,
      y: v1.y * (1 - t) + v2.y * t
    });
  }

  throw new Error(
    "Invalid arguments: v1 and v2 must be both numbers or both Points"
  );
}
