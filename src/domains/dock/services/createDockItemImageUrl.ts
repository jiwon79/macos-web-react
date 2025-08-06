import { DOCK_ITEM } from "../views/DockItem/constant";

const CANVAS_SIZE = 400;
const CANVAS_INNER_SIZE = CANVAS_SIZE * DOCK_ITEM.INNER_RATIO;

export function createDockItemImageUrl(imageData: ImageData): string | null {
  const canvas = document.createElement("canvas");
  canvas.width = CANVAS_SIZE;
  canvas.height = CANVAS_SIZE;
  const ctx = canvas.getContext("2d");
  if (ctx == null) {
    return null;
  }

  const imageCanvas = document.createElement("canvas");
  imageCanvas.width = imageData.width;
  imageCanvas.height = imageData.height;
  const imageCtx = imageCanvas.getContext("2d");
  if (imageCtx == null) {
    return null;
  }

  imageCtx.putImageData(imageData, 0, 0);

  const scale = Math.min(
    CANVAS_INNER_SIZE / imageData.width,
    CANVAS_INNER_SIZE / imageData.height
  );
  const scaledWidth = imageData.width * scale;
  const scaledHeight = imageData.height * scale;
  const offsetX = (CANVAS_SIZE - scaledWidth) / 2;
  const offsetY = (CANVAS_SIZE - scaledHeight) / 2;

  ctx.drawImage(imageCanvas, offsetX, offsetY, scaledWidth, scaledHeight);

  return canvas.toDataURL();
}
