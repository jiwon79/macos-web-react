import {
  IconWindowClose,
  IconWindowMaximize,
  IconWindowMinimize,
} from 'assets/icons';
import {
  useWindowsAction,
  useWindowsStore,
} from 'domains/window/store/store.ts';
import html2canvas from 'html2canvas';
import { useWindowContext } from '../WindowContext.ts';
import {
  closeIcon,
  container,
  maximizeIcon,
  minimizeIcon,
} from './WindowControl.css.ts';

interface WindowControlProps {
  size?: 'standard' | 'mono' | 'withTitle';
}

export function WindowControl({ size }: WindowControlProps) {
  const { id } = useWindowContext();
  const { removeWindow, minimizeWindow } = useWindowsAction();
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

    const { x, y, width, height } = curWindow.style;
    ctx.drawImage(windowCanvas, x, y, width, height);
    const image = ctx.getImageData(x, y, width, height);

    // 외부 변수 선언
    let leftBezierPoints: Point[] = [];
    let rightBezierPoints: Point[] = [];

    const animate1 = (startTime: number) => {
      const currentTime = Date.now();
      const t = Math.min((currentTime - startTime) / 1500, 1);
      const mt = 1 - t;

      // 베지어 곡선 좌표 계산
      const END_POINT = { x: minimizedDockRect.x, y: minimizedDockRect.top };
      const LEFT_END_X = x * mt + END_POINT.x * t;
      const RIGHT_END_X = (x + width) * mt + END_POINT.x * t;

      const LEFT_P0 = { x: x, y: y };
      const LEFT_P1 = {
        x: x,
        y: (y * 3) / 4 + (minimizedDockRect.top * 1) / 4,
      };
      const LEFT_P2 = {
        x: LEFT_END_X,
        y: (y * 1) / 4 + (minimizedDockRect.top * 3) / 4,
      };
      const LEFT_P3 = { x: LEFT_END_X, y: minimizedDockRect.top };

      const RIGHT_P0 = { x: x + width, y: y };
      const RIGHT_P1 = {
        x: x + width,
        y: (y * 3) / 4 + (minimizedDockRect.top * 1) / 4,
      };
      const RIGHT_P2 = {
        x: RIGHT_END_X,
        y: (y * 1) / 4 + (minimizedDockRect.top * 3) / 4,
      };
      const RIGHT_P3 = { x: RIGHT_END_X, y: minimizedDockRect.top };

      leftBezierPoints = getInterpolatedBezierPoints(
        LEFT_P0,
        LEFT_P1,
        LEFT_P2,
        LEFT_P3
      );
      rightBezierPoints = getInterpolatedBezierPoints(
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
      const t = Math.min((currentTime - startTime) / 1500, 1);

      const moveY = Math.round((canvas.height - height) * t);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

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
      }
    };

    minimizeWindow(id);
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

function getTransformedImage(
  image: ImageData,
  leftCurvePoints: Point[],
  rightCurvePoints: Point[],
  window: { x: number; y: number; width: number; height: number },
  screen: { width: number; height: number },
  yOffset: number
): ImageData {
  const { y, width, height } = window;
  const transformedImage = new ImageData(screen.width, screen.height);
  const imageData = image.data;
  const transformedImageDate = transformedImage.data;

  const maxHeight = Math.min(height, screen.height - yOffset);
  for (let yIdx = 0; yIdx < maxHeight; yIdx++) {
    const currentY = y + yIdx + yOffset;
    // TODO: O(n) -> O(1)
    const leftPoint = leftCurvePoints.find((p) => p.y === currentY);
    const rightPoint = rightCurvePoints.find((p) => p.y === currentY);
    if (leftPoint == null || rightPoint == null) {
      continue;
    }

    const startX = leftPoint.x;
    const endX = rightPoint.x;
    const targetWidth = endX - startX;

    for (let xIdx = 0; xIdx < targetWidth; xIdx++) {
      const srcX = Math.floor((xIdx / targetWidth) * width);
      const dstX = startX + xIdx;
      if (
        srcX < 0 ||
        srcX >= width ||
        dstX < 0 ||
        dstX >= screen.width ||
        currentY < 0 ||
        currentY >= screen.height
      ) {
        continue;
      }

      const srcIndex = (yIdx * width + srcX) * 4;
      const dstIndex = (currentY * screen.width + dstX) * 4;
      transformedImageDate[dstIndex] = imageData[srcIndex];
      transformedImageDate[dstIndex + 1] = imageData[srcIndex + 1];
      transformedImageDate[dstIndex + 2] = imageData[srcIndex + 2];
      transformedImageDate[dstIndex + 3] = imageData[srcIndex + 3];
    }
  }

  return transformedImage;
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

interface Point {
  x: number;
  y: number;
}

function getBezierPoint(
  t: number,
  P0: Point,
  P1: Point,
  P2: Point,
  P3: Point
): Point {
  const t2 = t * t;
  const t3 = t2 * t;
  const mt = 1 - t;
  const mt2 = mt * mt;
  const mt3 = mt2 * mt;

  return {
    x: mt3 * P0.x + 3 * mt2 * t * P1.x + 3 * mt * t2 * P2.x + t3 * P3.x,
    y: mt3 * P0.y + 3 * mt2 * t * P1.y + 3 * mt * t2 * P2.y + t3 * P3.y,
  };
}

function getInterpolatedBezierPoints(
  P0: Point,
  P1: Point,
  P2: Point,
  P3: Point
): Point[] {
  // 1. 기본 베지어 곡선 생성 (LENGTH=100)
  const LENGTH = 100;
  const times = Array.from({ length: LENGTH + 1 }, (_, i) => i / LENGTH);
  const bezierPoints = times.map((t) => getBezierPoint(t, P0, P1, P2, P3));

  // 2. 모든 좌표를 반올림하여 정수로 변환
  const roundedPoints = bezierPoints.map((point) => ({
    x: Math.round(point.x),
    y: Math.round(point.y),
  }));

  // 3. y값 범위 계산
  const minY = Math.min(...roundedPoints.map((p) => p.y));
  const maxY = Math.max(...roundedPoints.map((p) => p.y));

  // 4. y값이 비어있는 구간들을 찾아서 보간
  const result: Point[] = [];

  for (let y = minY; y <= maxY; y++) {
    // TODO: O(n) -> O(1)
    // 현재 y값에 해당하는 점들 찾기
    const pointsAtY = roundedPoints.filter((p) => p.y === y);

    if (pointsAtY.length > 0) {
      // 해당 y값에 점이 있으면 추가
      result.push(pointsAtY[0]);
    } else {
      // 해당 y값에 점이 없으면 양옆 점들을 찾아서 보간
      const lowerPoints = roundedPoints.filter((p) => p.y < y);
      const upperPoints = roundedPoints.filter((p) => p.y > y);

      if (lowerPoints.length > 0 && upperPoints.length > 0) {
        // 가장 가까운 아래쪽과 위쪽 점 찾기
        const lowerPoint = lowerPoints.reduce((prev, curr) =>
          prev.y > curr.y ? prev : curr
        );
        const upperPoint = upperPoints.reduce((prev, curr) =>
          prev.y < curr.y ? prev : curr
        );

        // 선형 보간으로 x값 계산
        const ratio = (y - lowerPoint.y) / (upperPoint.y - lowerPoint.y);
        const interpolatedX = Math.round(
          lowerPoint.x + ratio * (upperPoint.x - lowerPoint.x)
        );

        result.push({ x: interpolatedX, y });
      }
    }
  }

  return result;
}
