import {
  IconWindowClose,
  IconWindowMaximize,
  IconWindowMinimize,
} from 'assets/icons';
import { DOCK_ITEM_SIZE } from 'domains/dock/views/DockItem/constant';
import { useWindowsAction, useWindowsStore } from 'domains/window/store/store';
import { animateGenieEffect } from 'domains/window-animation/services/animateGenieEffect';
import {
  useWindowAnimationAction,
  useWindowAnimationStore,
} from 'domains/window-animation/store';
import html2canvas from 'html2canvas';
import { getImageData } from 'utils/browser';
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

    const target = {
      x: targetX,
      y: targetY,
      width: DOCK_ITEM_SIZE,
    };
    minimizeWindow({
      id,
      imageData: image,
      window: window.style,
      target,
    });
    startMinimizingWindow({
      id,
      imageData: image,
      window: window.style,
      target,
    });

    await animateGenieEffect({
      image,
      window: window.style,
      target,
      reverse: false,
    });

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
