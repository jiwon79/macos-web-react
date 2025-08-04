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
  const dockRef = useWindowAnimationStore((state) => state.dockRef);
  const { deleteWindow: removeWindow, minimizeWindow } = useWindowsAction();
  const minimizedDockIndicatorRef = useWindowAnimationStore(
    (state: any) => state.minimizedDockIndicatorRef
  );
  const {
    startMinimizingWindow,
    stopMinimizingWindow,
    getDockItemRef,
    getDockRef,
  } = useWindowAnimationAction();

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

    // Try to get existing dock item ref first, fallback to indicator ref
    const dockItemRef = getDockItemRef(id);
    const targetElement = dockItemRef || minimizedDockIndicatorRef;

    const targetRect = targetElement?.getBoundingClientRect();
    if (targetRect == null) {
      return;
    }
    const targetX = targetRect.x + targetRect.width / 2;
    const targetY = targetRect.y + targetRect.height / 2;

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
      dockY: dockRef?.getBoundingClientRect().y ?? targetY,
      target: () => {
        // Try to get dock item ref on each frame
        const ref = getDockItemRef(id);
        const dockRef = getDockRef();

        if (ref) {
          const rect = ref.getBoundingClientRect();
          return {
            x: rect.x + rect.width / 2,
            y: dockRef
              ? dockRef.getBoundingClientRect().y
              : rect.y + rect.height / 2,
            width: rect.width,
          };
        }
        return {
          x: target.x,
          y: dockRef ? dockRef.getBoundingClientRect().y : target.y,
          width: target.width,
        };
      },
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
