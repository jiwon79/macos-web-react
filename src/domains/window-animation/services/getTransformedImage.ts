import { Point } from 'domains/window/interface/Point';

export function getTransformedImage(
  image: ImageData,
  leftCurvePoints: Point[],
  rightCurvePoints: Point[],
  window: { x: number; y: number; width: number; height: number },
  screen: { width: number; height: number },
  yOffset: number
): ImageData {
  const { y, width, height } = window;
  const transformedImage = new ImageData(screen.width, screen.height);
  const imageData = image.data;
  const transformedImageDate = transformedImage.data;

  const maxHeight = Math.min(height, screen.height - yOffset);
  for (let yIdx = 0; yIdx < maxHeight; yIdx++) {
    const currentY = y + yIdx + yOffset;
    // TODO: O(n) -> O(1)
    const leftPoint = leftCurvePoints.find((p) => p.y === currentY);
    const rightPoint = rightCurvePoints.find((p) => p.y === currentY);
    if (leftPoint == null || rightPoint == null) {
      continue;
    }

    const startX = leftPoint.x;
    const endX = rightPoint.x;
    const targetWidth = endX - startX;

    for (let xIdx = 0; xIdx < targetWidth; xIdx++) {
      const srcX = Math.floor((xIdx / targetWidth) * width);
      const dstX = startX + xIdx;
      if (
        srcX < 0 ||
        srcX >= width ||
        dstX < 0 ||
        dstX >= screen.width ||
        currentY < 0 ||
        currentY >= screen.height
      ) {
        continue;
      }

      const srcIndex = (yIdx * width + srcX) * 4;
      const dstIndex = (currentY * screen.width + dstX) * 4;
      transformedImageDate[dstIndex] = imageData[srcIndex];
      transformedImageDate[dstIndex + 1] = imageData[srcIndex + 1];
      transformedImageDate[dstIndex + 2] = imageData[srcIndex + 2];
      transformedImageDate[dstIndex + 3] = imageData[srcIndex + 3];
    }
  }

  return transformedImage;
}
