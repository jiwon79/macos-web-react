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

const ANIMATION_DURATION = 2000;

export function WindowControl({ size }: WindowControlProps) {
  const { id } = useWindowContext();
  const {
    removeWindow,
    minimizeWindow,
    startMinimizingWindow,
    stopMinimizingWindow,
  } = useWindowsAction();
  const { windows, windowElements, minimizedDockIndicatorRef } =
    useWindowsStore();
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
    const offsetYRatio = windowImage.offsetYRatio;
    const DOCK_ITEM_SIZE_2 = DOCK_ITEM_SIZE * widthRatio;
    const DOCK_PADDING_TOP = 5;
    const DOCK_ITEM_OFFSET_Y =
      DOCK_ITEM_SIZE_2 * offsetYRatio + DOCK_PADDING_TOP;

    minimizeWindow({ id, image: windowImageUrl });
    startMinimizingWindow({ id, image: windowImageUrl });

    const { x, y, width, height } = curWindow.style;
    ctx.drawImage(windowCanvas, x, y, width, height);
    const image = ctx.getImageData(x, y, width, height);

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

    const animate1 = (startTime: number) => {
      const currentTime = Date.now();
      const t = Math.min(
        (currentTime - startTime) / (ANIMATION_DURATION / 2),
        1
      );
      const mt = 1 - t;

      // 베지어 곡선 좌표 계산
      const END_POINT = { x: minimizedDockRect.x, y: minimizedDockRect.top };
      const LEFT_END_X = x * mt + END_POINT.x * t - (DOCK_ITEM_SIZE_2 / 4) * t;
      const RIGHT_END_X =
        (x + width) * mt + END_POINT.x * t + (DOCK_ITEM_SIZE_2 / 4) * t;

      const LEFT_P0 = { x: x, y: y };
      const LEFT_P3 = {
        x: LEFT_END_X,
        y: minimizedDockRect.top + DOCK_ITEM_OFFSET_Y,
      };
      const [LEFT_P1, LEFT_P2] = getPoints(LEFT_P0, LEFT_P3);

      const RIGHT_P0 = { x: x + width, y: y };
      const RIGHT_P3 = {
        x: RIGHT_END_X,
        y: minimizedDockRect.top + DOCK_ITEM_OFFSET_Y,
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

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 베지어 곡선을 사용한 변형된 이미지 데이터 생성
      const transformedImage = getTransformedImage(
        image,
        leftBezierPoints,
        rightBezierPoints,
        { x, y, width, height },
        { width: canvas.width, height: canvas.height },
        0
      );
      ctx.putImageData(transformedImage, 0, 0);

      drawCurve(ctx, leftBezierPoints);
      drawCurve(ctx, rightBezierPoints);

      if (t < 1) {
        requestAnimationFrame(() => animate1(startTime));
      } else {
        // animate2 시작
        animate2(Date.now());
      }
    };

    animate1(Date.now());

    // animate2: 베지어 커브를 따라 y축으로 내려가는 애니메이션
    const animate2 = (startTime: number) => {
      const currentTime = Date.now();
      const t = Math.min(
        (currentTime - startTime) / (ANIMATION_DURATION / 2),
        1
      );

      const moveY = Math.round((minimizedDockRect.top - y) * t);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 베지어 곡선 좌표 계산
      const END_POINT = { x: minimizedDockRect.x, y: minimizedDockRect.top };
      const LEFT_END_X = END_POINT.x - (DOCK_ITEM_SIZE_2 / 4) * (1 + t);
      const RIGHT_END_X = END_POINT.x + (DOCK_ITEM_SIZE_2 / 4) * (1 + t);

      const LEFT_P0 = { x: x, y: y };
      const LEFT_P3 = {
        x: LEFT_END_X,
        y: minimizedDockRect.top + DOCK_ITEM_OFFSET_Y,
      };
      const [LEFT_P1, LEFT_P2] = getPoints(LEFT_P0, LEFT_P3);

      const RIGHT_P0 = { x: x + width, y: y };
      const RIGHT_P3 = {
        x: RIGHT_END_X,
        y: minimizedDockRect.top + DOCK_ITEM_OFFSET_Y,
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

      // 베지어 곡선을 사용한 변형된 이미지 데이터 생성 (yOffset 적용)
      const transformedImage = getTransformedImage(
        image,
        leftBezierPoints,
        rightBezierPoints,
        { x, y, width, height },
        { width: canvas.width, height: canvas.height },
        moveY
      );
      ctx.putImageData(transformedImage, 0, 0);

      // 1. 마지막 베지어 커브 그리기
      drawCurve(ctx, leftBezierPoints);
      drawCurve(ctx, rightBezierPoints);

      if (t < 1) {
        requestAnimationFrame(() => animate2(startTime));
      } else {
        document.body.removeChild(canvas);
        stopMinimizingWindow(id);
      }
    };
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
