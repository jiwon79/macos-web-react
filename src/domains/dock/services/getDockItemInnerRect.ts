import { DOCK_ITEM } from '../views/DockItem/constant';

export function getDockItemInnerRect(imageData: ImageData): {
  x: number;
  y: number;
  width: number;
  height: number;
} {
  const scale = Math.min(
    (DOCK_ITEM.SIZE * DOCK_ITEM.INNER_RATIO) / imageData.width,
    (DOCK_ITEM.SIZE * DOCK_ITEM.INNER_RATIO) / imageData.height
  );
  const scaledWidth = imageData.width * scale;
  const scaledHeight = imageData.height * scale;
  const offsetX = (DOCK_ITEM.SIZE - scaledWidth) / 2;
  const offsetY = (DOCK_ITEM.SIZE - scaledHeight) / 2;

  return { x: offsetX, y: offsetY, width: scaledWidth, height: scaledHeight };
}
