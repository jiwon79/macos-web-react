import { EMPTY_IMAGE_URL } from 'domains/dock/constant';
import { createDockItemImageUrl } from 'domains/dock/services/createDockItemImageUrl';
import {
  useMinimizingWindow,
  useRestoringWindow,
  useWindowAnimationAction,
} from 'domains/window-animation/store';
import { useMemo, useState } from 'react';
import { DockItem } from './DockItem';
import { MinimizingWindowDockItem } from './MinimizingWindowDockItem';
import { RestoringWindowDockItem } from './RestoringWindowDockItem';

interface WindowDockItemProps {
  windowId: string;
  image: ImageData;
  onClick?: () => void;
}

export function WindowDockItem({
  windowId,
  image,
  onClick,
}: WindowDockItemProps) {
  const minimizingWindow = useMinimizingWindow(windowId);
  const restoringWindow = useRestoringWindow(windowId);
  const { setDockItemElement } = useWindowAnimationAction();

  const src = useMemo(() => createDockItemImageUrl(image), [image]);
  const [distance, setDistance] = useState(100_000);

  if (minimizingWindow != null) {
    return (
      <div ref={(el) => setDockItemElement(windowId, el)}>
        <MinimizingWindowDockItem
          windowId={windowId}
          src={src ?? EMPTY_IMAGE_URL}
          onClick={onClick}
          minimizedWindow={minimizingWindow}
          onDistanceChange={setDistance}
        />
      </div>
    );
  }

  if (restoringWindow != null) {
    return (
      <div ref={(el) => setDockItemElement(windowId, el)}>
        <RestoringWindowDockItem
          windowId={windowId}
          onClick={onClick}
          distance={distance}
        />
      </div>
    );
  }

  return (
    <div ref={(el) => setDockItemElement(windowId, el)}>
      <DockItem
        src={src ?? EMPTY_IMAGE_URL}
        onClick={onClick}
        onDistanceChange={setDistance}
        initialDistance={distance}
      />
    </div>
  );
}
