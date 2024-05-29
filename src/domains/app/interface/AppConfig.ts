export interface Menu {
  name: string;
  submenuGroups: Submenu[][];
}

interface Submenu {
  name: string;
  shortcut?: string;
  disabled?: boolean;
}

export interface AppConfig {
  id: string;
  app: () => React.ReactElement;
  icon: string;
  menus: Menu[];
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
