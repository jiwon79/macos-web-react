import {
  IconWindowClose,
  IconWindowMaximize,
  IconWindowMinimize,
} from 'assets/icons';
import {
  useWindowsAction,
  useWindowsStore,
} from 'domains/window/store/store.ts';
import imageSrc from '../../../../assets/app-icons/ic-app-calculator.png';
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
  const { windows } = useWindowsStore();
  const windowwindow = windows.find((window) => window.id === id);

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
    if (ctx == null || windowwindow == null) {
      return;
    }

    const imageElement = await loadImage(imageSrc);
    const { x, y, width, height } = windowwindow.style;

    const animate = (startTime: number) => {
      const currentTime = Date.now();
      const progress = Math.min((currentTime - startTime) / 1000, 1); // 1000ms = 1초

      // 1.0에서 0.5로 변화하는 압축 비율 계산
      const compressionRatio = 1 - progress * 0.5; // 1.0 -> 0.5

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(imageElement, x, y, width, height);

      const image = ctx.getImageData(x, y, width, height);

      for (let i = 0; i < image.data.length; i += 4) {
        const index = Math.floor(i / 4);
        const pixelX = index % width;
        const pixelY = Math.floor(index / width);

        // 현재 압축 비율에 따른 경계선 계산
        const boundary = width * compressionRatio;

        if (pixelX <= boundary) {
          // 압축되는 영역
          const sourceX = Math.floor(pixelX * (width / boundary));
          const sourceIndex = (pixelY * width + sourceX) * 4;

          image.data[i] = image.data[sourceIndex];
          image.data[i + 1] = image.data[sourceIndex + 1];
          image.data[i + 2] = image.data[sourceIndex + 2];
          image.data[i + 3] = image.data[sourceIndex + 3];
        } else {
          // 투명해지는 영역
          image.data[i] = 0;
          image.data[i + 1] = 0;
          image.data[i + 2] = 0;
          image.data[i + 3] = 0;
        }
      }

      ctx.putImageData(image, x, y);

      if (progress < 1) {
        requestAnimationFrame(() => animate(startTime));
      } else {
        // 애니메이션 완료 후 정리
        document.body.removeChild(canvas);
        minimizeWindow(id);
      }
    };

    // 애니메이션 시작
    animate(Date.now());
  };

  const loadImage = (src: string) =>
    new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image();
      image.src = src;
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error('Failed to load image'));
    });

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
