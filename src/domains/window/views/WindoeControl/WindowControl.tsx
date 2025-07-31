import {
  IconWindowClose,
  IconWindowMaximize,
  IconWindowMinimize,
} from 'assets/icons';
import { DOCK_ITEM_SIZE } from 'domains/dock/views/DockItem';
import { Point } from 'domains/window/interface/Point';
import { useWindowsAction, useWindowsStore } from 'domains/window/store/store';
import { WINDOW_ANIMATION } from 'domains/window-animation/constant';
import {
  useWindowControlAction,
  useWindowControlStore,
} from 'domains/window-animation/windowControlStore';
import { easeInOut } from 'framer-motion';
import html2canvas from 'html2canvas';
import { useWindowContext } from '../WindowContext';
import { getInterpolatedBezierPoints } from './services/getInterpolatedBezierPoints';
import { getTransformedImage } from './services/getTransformedImage';
import { getWindowImageUrl } from './services/getWindowImageUrl';
import {
  closeIcon,
  container,
  maximizeIcon,
  minimizeIcon,
} from './WindowControl.css';

interface WindowControlProps {
  size?: 'standard' | 'mono' | 'withTitle';
}

export function WindowControl({ size }: WindowControlProps) {
  const { id } = useWindowContext();
  const { windows, windowElements } = useWindowsStore();
  const { deleteWindow: removeWindow, minimizeWindow } = useWindowsAction();
  const minimizedDockIndicatorRef = useWindowControlStore(
    (state) => state.minimizedDockIndicatorRef
  );
  const { startMinimizingWindow, stopMinimizingWindow } =
    useWindowControlAction();

  const curWindow = windows.find((window) => window.id === id);
  const curWindowElement = windowElements[id];

  const onCloseMouseDown = (event: React.MouseEvent) => {
    event.stopPropagation();
    removeWindow(id);
  };

  const onMinimizeMouseDown = async (event: React.MouseEvent) => {
    event.stopPropagation();
    if (curWindow == null || curWindowElement == null) {
      return;
    }

    const targetRect = minimizedDockIndicatorRef?.getBoundingClientRect();
    if (targetRect == null) {
      return;
    }
    const targetX = targetRect.x;
    const targetY = targetRect.y;

    const canvas = createScreenCanvas();
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    if (ctx == null) {
      return;
    }

    const windowCanvas = await html2canvas(curWindowElement, {
      backgroundColor: null,
      logging: false,
      useCORS: true,
    });

    const windowImage = getWindowImageUrl(windowCanvas);
    if (windowImage == null) {
      return;
    }

    const windowImageUrl = windowImage.url;
    const windowImageWidthRatio = windowImage.widthRatio;
    const targetWidth = DOCK_ITEM_SIZE * windowImageWidthRatio;

    minimizeWindow({ id, image: windowImageUrl });
    startMinimizingWindow({ id, image: windowImageUrl });

    const { x, y, width, height } = curWindow.style;
    ctx.drawImage(windowCanvas, x, y, width, height);
    const image = ctx.getImageData(x, y, width, height);

    const xAnimationDuration =
      WINDOW_ANIMATION.DURATION * WINDOW_ANIMATION.X_ANIMATION_DURATION_RATIO;
    const yAnimationStart =
      WINDOW_ANIMATION.DURATION *
      WINDOW_ANIMATION.X_ANIMATION_DURATION_RATIO *
      ((y + height) / targetY);
    const yAnimationDuration = WINDOW_ANIMATION.DURATION - yAnimationStart;

    const animate = (startTime: number) => {
      const currentTime = Date.now();
      const time = currentTime - startTime;
      const tRaw = Math.min(time / WINDOW_ANIMATION.DURATION, 1);
      const t = easeInOut(tRaw);

      const xtRaw = Math.min(time / xAnimationDuration, 1);
      const xt = easeInOut(xtRaw);
      const ytRaw = clamp((time - yAnimationStart) / yAnimationDuration, 0, 1);
      const yt = easeInOut(ytRaw);

      const currentTargetWidth = targetWidth * tRaw;
      const leftEndX = interpolate(x, targetX, xt) - currentTargetWidth / 2;
      const rightEndX =
        interpolate(x + width, targetX, xt) + currentTargetWidth / 2;

      const leftP0 = { x, y };
      const leftP3 = {
        x: leftEndX,
        y: targetY,
      };
      const [leftP1, leftP2] = getBezierMiddlePoints(leftP0, leftP3);

      const rightP0 = { x: x + width, y: y };
      const rightP3 = {
        x: rightEndX,
        y: targetRect.top,
      };
      const [rightP1, rightP2] = getBezierMiddlePoints(rightP0, rightP3);

      const leftBezierPoints = getInterpolatedBezierPoints(
        leftP0,
        leftP1,
        leftP2,
        leftP3
      );
      const rightBezierPoints = getInterpolatedBezierPoints(
        rightP0,
        rightP1,
        rightP2,
        rightP3
      );

      const moveY = Math.round((targetY - y) * yt);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 베지어 곡선을 사용한 변형된 이미지 데이터 생성
      const transformedImage = getTransformedImage(
        image,
        leftBezierPoints,
        rightBezierPoints,
        { x, y, width, height },
        { width: canvas.width, height: canvas.height },
        moveY
      );
      ctx.putImageData(transformedImage, 0, 0);

      if (t < 1) {
        requestAnimationFrame(() => animate(startTime));
      } else {
        document.body.removeChild(canvas);
        stopMinimizingWindow(id);
      }
    };

    animate(Date.now());
  };

  const onControlButtonMouseDown = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <div className={container({ size })}>
      <button className={closeIcon} onMouseDown={onCloseMouseDown}>
        <IconWindowClose />
      </button>
      <button className={minimizeIcon} onMouseDown={onMinimizeMouseDown}>
        <IconWindowMinimize />
      </button>
      <button className={maximizeIcon} onMouseDown={onControlButtonMouseDown}>
        <IconWindowMaximize />
      </button>
    </div>
  );
}

function createScreenCanvas() {
  const canvas = document.createElement('canvas');
  canvas.style.position = 'absolute';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  return canvas;
}

function interpolate(v1: number, v2: number, t: number) {
  return v1 * (1 - t) + v2 * t;
}

function drawCurve(ctx: CanvasRenderingContext2D, points: Point[]) {
  ctx.strokeStyle = 'rgba(255, 0, 0, 0.5)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 0; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.stroke();
}

const getBezierMiddlePoints = (P0: Point, P3: Point) => {
  const P1XRate = 0.08;
  const P1YRate = 0.38;
  const P1 = {
    x: P0.x * (1 - P1XRate) + P3.x * P1XRate,
    y: P0.y * (1 - P1YRate) + P3.y * P1YRate,
  };

  const P2XRate = 0.06;
  const P2YRate = 0.38;
  const P2 = {
    x: P0.x * P2XRate + P3.x * (1 - P2XRate),
    y: P0.y * P2YRate + P3.y * (1 - P2YRate),
  };
  return [P1, P2];
};

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(value, max));
}
