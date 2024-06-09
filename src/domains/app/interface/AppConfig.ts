export interface MenuConfig {
  name: string;
  submenuGroups: SubmenuConfig[][];
}

export interface SubmenuConfig {
  name: string;
  shortcut?: string;
  disabled?: boolean;
}

export interface AppConfig {
  id: string;
  app: () => React.ReactElement;
  icon: string;
  menus: MenuConfig[];
  resize?: {
    minWidth?: number;
    minHeight?: number;
    maxWidth?: number;
    maxHeight?: number;
  };
  initialStyle: {
    x?: number;
    y?: number;
    width: number;
    height: number;
  };
}
