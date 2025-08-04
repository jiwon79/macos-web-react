export function createScreenCanvas() {
  const canvas = document.createElement('canvas');
  canvas.style.position = 'absolute';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.zIndex = '1'; // Behind dock which typically has higher z-index
  canvas.style.pointerEvents = 'none'; // Prevent interaction issues
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  return canvas;
}
