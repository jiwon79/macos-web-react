import { AppConfig } from '../interface';
import { Calculator } from './views/Calculator';

export const calculatorConfig: AppConfig = {
  id: 'Calculator',
  icon: 'src/assets/app-icons/ic_app_calculator.png',
  app: Calculator,
  menus: [
    {
      name: 'Calculator',
      submenus: [
        [
          {
            name: 'About Calculator',
            shortcut: 'Ctrl+Shift+A',
          },
          {
            name: 'Hide Calculator',
            shortcut: 'Ctrl+Shift+H',
          },
          {
            name: 'Quit Calculator',
            shortcut: 'Ctrl+Shift+Q',
          },
        ],
      ],
    },
    {
      name: 'File',
      submenus: [
        [
          {
            name: 'New',
            shortcut: 'Ctrl+N',
          },
          {
            name: 'Open',
            shortcut: 'Ctrl+O',
          },
        ],
        [
          {
            name: 'Save',
            shortcut: 'Ctrl+S',
          },
          {
            name: 'Save As',
            shortcut: 'Ctrl+Shift+S',
          },
          {
            name: 'Close',
            shortcut: 'Ctrl+W',
          },
        ],
      ],
    },
  ],
  initialStyle: {
    width: 300,
    height: 400,
  },
};
