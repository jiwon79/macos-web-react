import { DeepPartial } from '../../../utils/type/DeepPartial.ts';
import { WindowState } from './WindowState.ts';

export interface WindowsState {
  windows: WindowState[];
  focusedWindowID?: string;
}

export interface WindowsAction {
  setFocusedWindowID: (id: string) => void;
  addWindow: (window: WindowState) => void;
  removeWindow: (id: string) => void;
  updateWindow: (id: string, data: DeepPartial<WindowState>) => void;
}
