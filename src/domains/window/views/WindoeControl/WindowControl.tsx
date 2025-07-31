import {
  IconWindowClose,
  IconWindowMaximize,
  IconWindowMinimize,
} from 'assets/icons';
import { DOCK_ITEM_SIZE } from 'domains/dock/views/DockItem';
import { useWindowsAction, useWindowsStore } from 'domains/window/store/store';
import { WINDOW_ANIMATION } from 'domains/window-animation/constant';
import {
  useWindowControlAction,
  useWindowControlStore,
} from 'domains/window-animation/windowControlStore';
import html2canvas from 'html2canvas';
import { clamp, interpolate } from 'utils/math';
import { useWindowContext } from '../WindowContext';
import { createScreenCanvas } from './services/createScreenCanvas';
import { easeInOut } from './services/cubicBezier';
import { getTransformedImage } from './services/getTransformedImage';
import { getWindowImageUrl } from './services/getWindowImageUrl';
import { getWindowInterpolatedBezierPoints } from './services/getWindowInterpolatedBezierPoints';
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
      const leftEndX = interpolate(x, targetX)(xt) - currentTargetWidth / 2;
      const rightEndX =
        interpolate(x + width, targetX)(xt) + currentTargetWidth / 2;

      const leftStart = { x, y };
      const leftEnd = {
        x: leftEndX,
        y: targetY,
      };
      const leftBezierPoints = getWindowInterpolatedBezierPoints(
        leftStart,
        leftEnd
      );

      const rightStart = { x: x + width, y: y };
      const rightEnd = {
        x: rightEndX,
        y: targetY,
      };
      const rightBezierPoints = getWindowInterpolatedBezierPoints(
        rightStart,
        rightEnd
      );

      const moveY = Math.round((targetY - y) * yt);

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
