import { getDockItemInnerRect } from 'domains/dock/services/getDockItemInnerRect';
import { WINDOW_ANIMATION } from 'domains/window-animation/constant';
import { clamp, easeInOut, easeOut, interpolate, Point } from 'utils/math';
import { createScreenCanvas } from './createScreenCanvas';
import { getGenieAnimationTime } from './getGenieAnimationTime';
import { getTransformedImage } from './getTransformedImage';
import { getWindowInterpolatedBezierPoints } from './getWindowInterpolatedBezierPoints';

export async function animateGenieEffect(params: {
  image: ImageData;
  window: { x: number; y: number; width: number; height: number };
  target: () => { x: number; y: number; width: number };
  dockY: number;
  reverse: boolean;
}) {
  const { image, window, target, dockY, reverse = false } = params;
  const { x, y, width, height } = window;

  const { xAnimationDuration, yAnimationStart, yAnimationDuration } =
    getGenieAnimationTime(window, dockY);

  const canvas = createScreenCanvas();
  const ctx = canvas.getContext('2d');
  if (ctx == null) {
    return;
  }

  const innerRect = getDockItemInnerRect(image);
  const targetWidth = innerRect.width;

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

      // Update target position on each frame
      const currentTarget = target();
      const currentTargetX = currentTarget.x;
      const currentTargetY = currentTarget.y;

      const xt = Math.min(time / xAnimationDuration, 1);
      const easeXt = easeInOut(xt);
      const yt = clamp((time - yAnimationStart) / yAnimationDuration, 0, 1);
      const easeYt = easeOut(yt);

      const currentTargetWidth = targetWidth * t;

      const leftStart = { x, y };
      const leftEnd = {
        x: interpolate(x, currentTargetX)(easeXt) - currentTargetWidth / 2,
        y: currentTargetY,
      };
      const rightStart = { x: x + width, y };
      const rightEnd = {
        x:
          interpolate(x + width, currentTargetX)(easeXt) +
          currentTargetWidth / 2,
        y: currentTargetY,
      };

      // TODO: 여기에서 end 지점 때문에 윈도우가 target 밑에 있을 때는 다 짤림 (위로 올리는 애니메이션)
      const leftBezierPoints = getWindowInterpolatedBezierPoints(
        leftStart,
        leftEnd
      );
      const rightBezierPoints = getWindowInterpolatedBezierPoints(
        rightStart,
        rightEnd
      );

      const moveY = Math.round((currentTargetY - y) * easeYt);

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

      drawCurve(ctx, leftBezierPoints);
      drawCurve(ctx, rightBezierPoints);

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
