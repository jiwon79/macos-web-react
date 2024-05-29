import { AppConfig } from '../../interface';
import { Finder } from './views/Finder';

export const finderConfig: AppConfig = {
  id: 'Finder',
  icon: 'src/assets/app-icons/ic_app_calculator.png',
  app: Finder,
  menus: [
    {
      name: 'Finder',
      submenuGroups: [
        [
          {
            name: 'About Finder',
          },
        ],
        [
          {
            name: 'Preferences',
            shortcut: 'Ctrl+P',
          },
        ],
      ],
    },
    {
      name: 'File',
      submenuGroups: [
        [
          {
            name: 'New Finder Window',
            shortcut: 'Ctrl+N',
          },
          {
            name: 'Open',
            shortcut: 'Ctrl+O',
          },
        ],
        [
          {
            name: 'Close',
            shortcut: 'Ctrl+W',
          },
        ],
      ],
    },
  ],
  initialStyle: {
    width: 600,
    height: 800,
  },
};
