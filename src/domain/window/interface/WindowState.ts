export type WindowState = {
  id: string;
  title: string;
  content: React.ReactNode;
  style: WindowStyle;
};

export interface WindowStyle {
  x: number;
  y: number;
  width: number;
  height: number;
}
