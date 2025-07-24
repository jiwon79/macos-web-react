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
  const { windows, windowElements } = useWindowsStore();
  const curWindow = windows.find((window) => window.id === id);
  const curWindowElement = windowElements[id];

  const onCloseMouseDown = (event: React.MouseEvent) => {
    event.stopPropagation();
    removeWindow(id);
  };

  const onMinimizeMouseDown = async (event: React.MouseEvent) => {
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

    const animate = (startTime: number) => {
      const currentTime = Date.now();
      const t = Math.min((currentTime - startTime) / 1500, 1);

      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 압축 이미지는 항상 캔버스 크기로 생성
      const compressedImage = ctx.createImageData(canvas.width, canvas.height);
      const srcData = image.data;
      const dstData = compressedImage.data;
      for (let yIdx = 0; yIdx < height; yIdx++) {
        const ratio = yIdx / height;
        const scaleX = 1 - ratio * t;
        const rowTargetWidth = Math.max(1, Math.floor(width * scaleX));

        const startX = 0 + Math.floor(t * ratio * 200);
        const dstY = y + yIdx;

        for (let xIdx = 0; xIdx < rowTargetWidth; xIdx++) {
          const srcX = Math.floor(xIdx / scaleX);
          const srcIndex = (yIdx * width + srcX) * 4;
          const dstX = x + startX + xIdx;
          if (
            dstX >= 0 &&
            dstX < canvas.width &&
            dstY >= 0 &&
            dstY < canvas.height
          ) {
            const dstIndex = (dstY * canvas.width + dstX) * 4;
            dstData[dstIndex] = srcData[srcIndex];
            dstData[dstIndex + 1] = srcData[srcIndex + 1];
            dstData[dstIndex + 2] = srcData[srcIndex + 2];
            dstData[dstIndex + 3] = srcData[srcIndex + 3];
          }
        }
      }
      ctx.putImageData(compressedImage, 0, 0);

      if (t < 1) {
        requestAnimationFrame(() => animate(startTime));
      } else {
        document.body.removeChild(canvas);
      }
    };

    animate(Date.now());

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
