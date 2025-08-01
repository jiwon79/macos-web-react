import {
  IconWindowClose,
  IconWindowMaximize,
  IconWindowMinimize,
} from 'assets/icons';
import { DOCK_ITEM_SIZE } from 'domains/dock/views/DockItem/constant';
import { useWindowsAction, useWindowsStore } from 'domains/window/store/store';
import {
  useWindowAnimationAction,
  useWindowAnimationStore,
} from 'domains/window-animation/store';
import html2canvas from 'html2canvas';
import { useWindowContext } from '../WindowContext';
import { animateGenieEffect } from './services/animateGenieEffect';
import { getDockItemImage } from './services/getDockItemImage';
import { getImageData } from './services/getImageData';
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
  const minimizedDockIndicatorRef = useWindowAnimationStore(
    (state) => state.minimizedDockIndicatorRef
  );
  const { startMinimizingWindow, stopMinimizingWindow } =
    useWindowAnimationAction();

  const window = windows.find((window) => window.id === id);
  const windowElement = windowElements[id];

  const onCloseMouseDown = (event: React.MouseEvent) => {
    event.stopPropagation();
    removeWindow(id);
  };

  const onMinimizeMouseDown = async (event: React.MouseEvent) => {
    event.stopPropagation();
    if (window == null || windowElement == null) {
      return;
    }

    const targetRect = minimizedDockIndicatorRef?.getBoundingClientRect();
    if (targetRect == null) {
      return;
    }
    const targetX = targetRect.x;
    const targetY = targetRect.y;

    const windowCanvas = await html2canvas(windowElement, {
      backgroundColor: null,
      logging: false,
      useCORS: true,
    });
    const { width, height } = window.style;
    const image = getImageData(windowCanvas, width, height);
    if (image == null) {
      return;
    }

    const dockItemImage = getDockItemImage(windowCanvas);
    if (dockItemImage == null) {
      return;
    }

    const dockItemImageUrl = dockItemImage.url;
    const dockItemImageWidthRatio = dockItemImage.widthRatio;
    const targetWidth = DOCK_ITEM_SIZE * dockItemImageWidthRatio;

    const target = { x: targetX, y: targetY, width: targetWidth };
    minimizeWindow({
      id,
      image: dockItemImageUrl,
      window: window.style,
      target,
    });
    startMinimizingWindow({
      id,
      image: dockItemImageUrl,
      window: window.style,
      target,
    });

    await animateGenieEffect(image, window.style, target);

    stopMinimizingWindow(id);
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
