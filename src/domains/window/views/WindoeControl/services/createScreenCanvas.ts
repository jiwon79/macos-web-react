export function createScreenCanvas() {
  const canvas = document.createElement('canvas');
  canvas.style.position = 'absolute';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  return canvas;
}
