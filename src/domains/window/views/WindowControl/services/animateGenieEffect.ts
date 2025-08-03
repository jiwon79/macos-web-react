import { WINDOW_ANIMATION } from 'domains/window-animation/constant';
import { clamp, interpolate } from 'utils/math';
import { createScreenCanvas } from './createScreenCanvas';
import { easeInOut } from './cubicBezier';
import { getGenieAnimationTime } from './getGenieAnimationTime';
import { getTransformedImage } from './getTransformedImage';
import { getWindowInterpolatedBezierPoints } from './getWindowInterpolatedBezierPoints';

export async function animateGenieEffect(
  image: ImageData,
  window: { x: number; y: number; width: number; height: number },
  target: { x: number; y: number; width: number }
) {
  console.log('START', Date.now());
  const targetX = target.x;
  const targetY = target.y;
  const targetWidth = target.width;
  const { x, y, width, height } = window;

  const { xAnimationDuration, yAnimationStart, yAnimationDuration } =
    getGenieAnimationTime(window, target);
  console.log('getGenieAnimationTime', Date.now());

  const canvas = createScreenCanvas();
  const ctx = canvas.getContext('2d');
  if (ctx == null) {
    return;
  }

  document.body.appendChild(canvas);

  return new Promise((resolve) => {
    const animate = (startTime: number) => {
      const currentTime = Date.now();
      const time = currentTime - startTime;
      const t = Math.min(time / WINDOW_ANIMATION.DURATION, 1);
      const easeT = easeInOut(t);

      const xt = Math.min(time / xAnimationDuration, 1);
      const easeXt = easeInOut(xt);
      const yt = clamp((time - yAnimationStart) / yAnimationDuration, 0, 1);
      const easeYt = easeInOut(yt);

      const currentTargetWidth = targetWidth * t;

      const leftStart = { x, y };
      const leftEnd = {
        x: interpolate(x, targetX)(easeXt) - currentTargetWidth / 2,
        y: targetY,
      };
      const rightStart = { x: x + width, y };
      const rightEnd = {
        x: interpolate(x + width, targetX)(easeXt) + currentTargetWidth / 2,
        y: targetY,
      };

      // TODO: 여기에서 end 지점 때문에 윈도우가 target 밑에 있을 때는 다 짤림
      const leftBezierPoints = getWindowInterpolatedBezierPoints(
        leftStart,
        leftEnd
      );
      const rightBezierPoints = getWindowInterpolatedBezierPoints(
        rightStart,
        rightEnd
      );

      const moveY = Math.round((targetY - y) * easeYt);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const transformedImage = getTransformedImage(
        image,
        leftBezierPoints,
        rightBezierPoints,
        { x, y, width, height },
        { width: canvas.width, height: canvas.height },
        moveY
      );
      ctx.putImageData(transformedImage, 0, 0);

      if (easeT < 1) {
        requestAnimationFrame(() => animate(startTime));
      } else {
        document.body.removeChild(canvas);
        resolve(void 0);
      }
    };

    animate(Date.now());
  });
}
