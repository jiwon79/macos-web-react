import { DEBUG } from 'domains/debug/constant';
import { getDockItemInnerRectRatio } from 'domains/dock/services/getDockItemInnerRectRatio';
import { WINDOW_ANIMATION } from 'domains/window-animation/constant';
import { clamp, easeInOut, easeOut, interpolate, Point } from 'utils/math';
import { createScreenCanvas } from './createScreenCanvas';
import { getGenieAnimationTime } from './getGenieAnimationTime';
import { getTransformedImage } from './getTransformedImage';
import { getWindowInterpolatedBezierPoints } from './getWindowInterpolatedBezierPoints';

export async function animateGenieEffect(params: {
  image: ImageData;
  window: { x: number; y: number; width: number; height: number };
  getTarget: () => { x: number; y: number; width: number };
  reverse: boolean;
}) {
  const { image, window, getTarget, reverse = false } = params;
  const { x, y, width, height } = window;
  const initialTarget = getTarget();

  const { xAnimationDuration, yAnimationStart, yAnimationDuration } =
    getGenieAnimationTime(window, initialTarget.y);

  const canvas = createScreenCanvas();
  const ctx = canvas.getContext('2d');
  if (ctx == null) {
    return;
  }

  const innerRectRatio = getDockItemInnerRectRatio(image);

  document.body.appendChild(canvas);

  return new Promise((resolve) => {
    const animate = (startTime: number) => {
      const currentTime = Date.now();
      const diff = currentTime - startTime;
      const time = reverse ? WINDOW_ANIMATION.DURATION - diff : diff;
      const t = time / WINDOW_ANIMATION.DURATION;

      if (t < 0 || t > 1) {
        document.body.removeChild(canvas);
        resolve(void 0);
        return;
      }

      const target = getTarget();
      const targetInnerWidth = target.width * innerRectRatio.width;
      const targetInnerX = target.x + target.width * innerRectRatio.x;
      const targetY = target.y;

      const xt = Math.min(time / xAnimationDuration, 1);
      const easeXt = easeInOut(xt);
      const yt = clamp((time - yAnimationStart) / yAnimationDuration, 0, 1);
      const easeYt = easeInOut(yt);

      const upYt = Math.min(time / (yAnimationStart * 0.95), 1);
      const easeUpYt = easeOut(upYt);

      const upperYDiff = Math.max(y + height - targetY, 0);
      const currentUpperYDiff = Math.round(upperYDiff * easeUpYt);
      const upperY = Math.round(y - upperYDiff);

      const leftStart = { x, y: y - currentUpperYDiff };
      const leftEnd = {
        x: interpolate(x, targetInnerX)(easeXt),
        y: targetY + upperYDiff - currentUpperYDiff,
      };
      const rightStart = { x: x + width, y: y - currentUpperYDiff };
      const rightEnd = {
        x: interpolate(x + width, targetInnerX)(easeXt) + targetInnerWidth,
        y: targetY + upperYDiff - currentUpperYDiff,
      };

      const leftBezierPoints = getWindowInterpolatedBezierPoints(
        leftStart,
        leftEnd
      );
      const rightBezierPoints = getWindowInterpolatedBezierPoints(
        rightStart,
        rightEnd
      );

      const moveY = Math.round((targetY - upperY) * easeYt);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const transformedImage = getTransformedImage(
        image,
        leftBezierPoints,
        rightBezierPoints,
        { x, y: y - currentUpperYDiff, width, height },
        { width: canvas.width, height: canvas.height },
        moveY
      );
      ctx.putImageData(transformedImage, 0, 0);

      if (DEBUG.WINDOW_ANIMATION) {
        drawCurve(ctx, leftBezierPoints);
        drawCurve(ctx, rightBezierPoints);
      }

      requestAnimationFrame(() => animate(startTime));
    };

    animate(Date.now());
  });
}

function drawCurve(ctx: CanvasRenderingContext2D, points: Point[]) {
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'red';
  ctx.stroke();
}
