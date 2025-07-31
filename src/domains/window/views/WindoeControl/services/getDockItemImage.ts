const SIZE = 400;
const INNER_SIZE_RATIO = 0.85;
const INNER_SIZE = SIZE * INNER_SIZE_RATIO;

export function getDockItemImage(
  windowCanvas: HTMLCanvasElement
): { url: string; widthRatio: number } | null {
  const resizedCanvas = document.createElement('canvas');
  resizedCanvas.width = SIZE;
  resizedCanvas.height = SIZE;
  const resizedCtx = resizedCanvas.getContext('2d');
  if (resizedCtx == null) {
    return null;
  }

  const scale = Math.min(
    INNER_SIZE / windowCanvas.width,
    INNER_SIZE / windowCanvas.height
  );
  const scaledWidth = windowCanvas.width * scale;
  const scaledHeight = windowCanvas.height * scale;
  const offsetX = (SIZE - scaledWidth) / 2;
  const offsetY = (SIZE - scaledHeight) / 2;

  resizedCtx.drawImage(
    windowCanvas,
    offsetX,
    offsetY,
    scaledWidth,
    scaledHeight
  );

  return {
    url: resizedCanvas.toDataURL(),
    widthRatio: scaledWidth / SIZE,
  };
}
