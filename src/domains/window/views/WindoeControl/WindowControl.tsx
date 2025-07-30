import {
  IconWindowClose,
  IconWindowMaximize,
  IconWindowMinimize,
} from 'assets/icons';
import { DOCK_ITEM_SIZE } from 'domains/dock/views/DockItem';
import { Point } from 'domains/window/interface/Point';
import { getInterpolatedBezierPoints } from 'domains/window/services/getInterpolatedBezierPoints';
import { getTransformedImage } from 'domains/window/services/getTransformedImage';
import { getWindowImageUrl } from 'domains/window/services/getWindowImageUrl';
import { useWindowsAction, useWindowsStore } from 'domains/window/store/store';
import {
  useWindowControlAction,
  useWindowControlStore,
} from 'domains/window-animation/windowControlStore';
import html2canvas from 'html2canvas';
import { useWindowContext } from '../WindowContext';
import {
  closeIcon,
  container,
  maximizeIcon,
  minimizeIcon,
} from './WindowControl.css';

interface WindowControlProps {
  size?: 'standard' | 'mono' | 'withTitle';
}

const ANIMATION_DURATION = 500;

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
    const minimizedDockRect =
      minimizedDockIndicatorRef?.getBoundingClientRect();
    if (minimizedDockRect == null) {
      return;
    }

    event.stopPropagation();
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    if (ctx == null || curWindow == null || !curWindowElement) {
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
    const widthRatio = windowImage.widthRatio;
    const DOCK_ITEM_SIZE_2 = DOCK_ITEM_SIZE * widthRatio;

    minimizeWindow({ id, image: windowImageUrl });
    startMinimizingWindow({ id, image: windowImageUrl });

    const { x, y, width, height } = curWindow.style;
    ctx.drawImage(windowCanvas, x, y, width, height);
    const image = ctx.getImageData(x, y, width, height);

    const X_ANIMATION_DURATION = (ANIMATION_DURATION * 2) / 5;
    const Y_ANIMATION_START =
      ANIMATION_DURATION * (3 / 5) * (y / canvas.height);
    const Y_ANIMATION_DURATION = ANIMATION_DURATION - Y_ANIMATION_START;

    const getPoints = (P0: Point, P3: Point) => {
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

    const animate = (startTime: number) => {
      const currentTime = Date.now();
      const time = currentTime - startTime;
      const t = Math.min(time / ANIMATION_DURATION, 1);

      const xt = Math.min(time / X_ANIMATION_DURATION, 1);
      const mxt = 1 - xt;
      const yt = Math.max(
        Math.min((time - Y_ANIMATION_START) / Y_ANIMATION_DURATION, 1),
        0
      );

      // 베지어 곡선 좌표 계산
      const END_POINT = { x: minimizedDockRect.x, y: minimizedDockRect.top };
      const LEFT_END_X =
        x * mxt + END_POINT.x * xt - (DOCK_ITEM_SIZE_2 / 2) * t;
      const RIGHT_END_X =
        (x + width) * mxt + END_POINT.x * xt + (DOCK_ITEM_SIZE_2 / 2) * t;

      const LEFT_P0 = { x: x, y: y };
      const LEFT_P3 = {
        x: LEFT_END_X,
        y: minimizedDockRect.top,
      };
      const [LEFT_P1, LEFT_P2] = getPoints(LEFT_P0, LEFT_P3);

      const RIGHT_P0 = { x: x + width, y: y };
      const RIGHT_P3 = {
        x: RIGHT_END_X,
        y: minimizedDockRect.top,
      };
      const [RIGHT_P1, RIGHT_P2] = getPoints(RIGHT_P0, RIGHT_P3);

      const leftBezierPoints = getInterpolatedBezierPoints(
        LEFT_P0,
        LEFT_P1,
        LEFT_P2,
        LEFT_P3
      );
      const rightBezierPoints = getInterpolatedBezierPoints(
        RIGHT_P0,
        RIGHT_P1,
        RIGHT_P2,
        RIGHT_P3
      );

      const moveY = Math.round((minimizedDockRect.top - y) * yt);

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

      drawCurve(ctx, leftBezierPoints);
      drawCurve(ctx, rightBezierPoints);

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
