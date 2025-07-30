export interface Window {
  id: string;
  appID: string;
  content: React.ReactNode;
  style: WindowStyle;
}

export interface WindowStyle {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface MinimizedWindow {
  id: string;
  image: string;
}
