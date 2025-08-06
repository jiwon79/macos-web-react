import { IconAppCalculator } from 'assets/app-icons';
import { AppConfig } from '../../interface';
import { Calculator } from './views/Calculator';

export const calculatorConfig: AppConfig = {
  id: 'Calculator',
  icon: IconAppCalculator,
  app: Calculator,
  menus: [
    {
      name: 'Calculator',
      submenuGroups: [
        [
          {
            name: 'About Calculator',
          },
        ],
        [
          {
            name: 'Hide Calculator',
            shortcut: '⌘H',
          },
          {
            name: 'Hide Others',
            shortcut: '⌥⌘H',
          },
          {
            name: 'Show All',
            disabled: true,
          },
        ],
        [
          {
            name: 'Quit Calculator',
            shortcut: '⌘Q',
          },
        ],
      ],
    },
    {
      name: 'File',
      submenuGroups: [
        [
          {
            name: 'Close',
            shortcut: '⌘W',
          },
          {
            name: 'Save Tape As…',
            shortcut: '⇧⌘S',
          },
        ],
        [
          {
            name: 'Page Setup…',
            shortcut: '⇧⌘P',
          },
          {
            name: 'Print Tape…',
            shortcut: '⌘P',
          },
        ],
      ],
    },
    {
      name: 'Edit',
      submenuGroups: [
        [
          {
            name: 'Undo',
            shortcut: '⌘Z',
            disabled: true,
          },
          {
            name: 'Redo',
            shortcut: '⇧⌘Z',
            disabled: true,
          },
        ],
        [
          {
            name: 'Cut',
            shortcut: '⌘X',
            disabled: true,
          },
          {
            name: 'Copy',
            shortcut: '⌘C',
          },
          {
            name: 'Paste',
            shortcut: '⌘V',
          },
          {
            name: 'Clear',
            disabled: true,
          },
          {
            name: 'Select All',
            shortcut: '⌘A',
            disabled: true,
          },
        ],
        [
          {
            name: 'Auto Fill',
          },
          {
            name: 'Start Dictation…',
          },
          {
            name: 'Emoji & Symbols',
          },
        ],
      ],
    },
    {
      name: 'View',
      submenuGroups: [
        [
          {
            name: 'Basic(selected)',
            shortcut: '⌘1',
          },
          {
            name: 'Scientific',
            shortcut: '⌘2',
          },
          {
            name: 'Programmer',
            shortcut: '⌘3',
          },
        ],
        [
          {
            name: 'Show Thousands Separators',
          },
        ],
        [
          {
            name: 'RPN Mode',
            shortcut: '⌘R',
          },
        ],
        [
          {
            name: 'Decimal Places',
          },
          {
            name: 'Enter Full Screen',
            shortcut: '⌥F',
            disabled: true,
          },
        ],
      ],
    },
    {
      name: 'Convert',
      submenuGroups: [
        [
          {
            name: 'Recent Conversions',
          },
        ],
        [
          {
            name: 'Area…',
          },
          {
            name: 'Currency…',
          },
          {
            name: 'Energy or Work…',
          },
          {
            name: 'Length…',
          },
          {
            name: 'Power…',
          },
          {
            name: 'Pressure…',
          },
          {
            name: 'Speed…',
          },
          {
            name: 'Temperature…',
          },
          {
            name: 'Time…',
          },
          {
            name: 'Volume…',
          },
          {
            name: 'Weights and Masses…',
          },
        ],
      ],
    },
    {
      name: 'Speech',
      submenuGroups: [
        [
          {
            name: 'Speak Button Pressed',
          },
          {
            name: 'Speak Result',
          },
        ],
      ],
    },
    {
      name: 'Window',
      submenuGroups: [
        [
          {
            name: 'Move Window to Left Side of Screen',
          },
          {
            name: 'Move Window to Right Side of Screen',
          },
          {
            name: 'Replace Tiled Window',
            disabled: true,
          },
        ],
        [
          {
            name: 'Remove Window from Set',
            disabled: true,
          },
          {
            name: 'Minimize',
            shortcut: '⌘M',
            disabled: true,
          },
          {
            name: 'Zoom',
            disabled: true,
          },
        ],
        [
          {
            name: 'Show Paper Tape',
            shortcut: '⌘T',
          },
        ],
        [
          {
            name: 'Bring All to Front',
          },
        ],
      ],
    },
    {
      name: 'Help',
      submenuGroups: [
        [
          {
            name: 'Search(input)',
          },
          {
            name: 'Calculator Help',
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
