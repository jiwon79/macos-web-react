import { Z_INDEX } from "third-parties/vanilla-extract";

export function createScreenCanvas() {
  const canvas = document.createElement("canvas");
  canvas.style.position = "absolute";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.zIndex = Z_INDEX.canvas.toString();
  canvas.style.pointerEvents = "none";
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  return canvas;
}
