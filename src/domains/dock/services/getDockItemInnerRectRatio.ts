import { DOCK_ITEM } from '../views/DockItem/constant';

export function getDockItemInnerRectRatio(imageData: ImageData): {
  x: number;
  y: number;
  width: number;
  height: number;
} {
  const scaleRatio = Math.min(
    DOCK_ITEM.INNER_RATIO / imageData.width,
    DOCK_ITEM.INNER_RATIO / imageData.height
  );
  const scaledWidthRatio = imageData.width * scaleRatio;
  const scaledHeightRatio = imageData.height * scaleRatio;
  const offsetXRatio = (1 - scaledWidthRatio) / 2;
  const offsetYRatio = (1 - scaledHeightRatio) / 2;

  return {
    x: offsetXRatio,
    y: offsetYRatio,
    width: scaledWidthRatio,
    height: scaledHeightRatio,
  };
}
