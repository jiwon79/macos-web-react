export type WindowState = WindowBase & { style: WindowStyle };

export interface WindowBase {
  id: string;
  title: string;
  content: React.ReactNode;
}

export interface WindowStyle {
  x: number;
  y: number;
  width: number;
  height: number;
}
