import { WINDOW_ANIMATION } from "domains/window-animation/constant";
import { getEaseOutXForY } from "utils/math";

const { DURATION, X_ANIMATION_DURATION_RATIO } = WINDOW_ANIMATION;

export function getGenieAnimationTime(
  window: { x: number; y: number; width: number; height: number },
  targetY: number
) {
  const { y, height } = window;

  const xAnimationDuration = DURATION * X_ANIMATION_DURATION_RATIO;
  const yAnimationStart =
    DURATION * X_ANIMATION_DURATION_RATIO * ((y + height) / targetY);
  const yAnimationDuration = DURATION - yAnimationStart;

  const fillAnimationStartAfterYAnimationStart =
    getEaseOutXForY((targetY - y - height) / (targetY - y)) *
    yAnimationDuration;
  const fillAnimationStart =
    fillAnimationStartAfterYAnimationStart + yAnimationStart;

  return {
    xAnimationDuration,
    yAnimationStart,
    yAnimationDuration,
    fillAnimationStart
  };
}
