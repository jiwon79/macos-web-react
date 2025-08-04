export const getImageData = (
  canvas: HTMLCanvasElement,
  width: number,
  height: number
): ImageData | null => {
  const backgroundCanvas = document.createElement('canvas');
  backgroundCanvas.width = width;
  backgroundCanvas.height = height;

  const ctx = backgroundCanvas.getContext('2d');
  if (ctx == null) {
    return null;
  }

  ctx.drawImage(canvas, 0, 0, width, height);

  return ctx.getImageData(0, 0, width, height);
};
