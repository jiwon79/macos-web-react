import { recipe } from '@vanilla-extract/recipes';
import { darkModeStyle, FONT } from 'third-parties/vanilla-extract';
import { hexAlpha } from 'utils/style';

export const container = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    height: 24,
    boxSizing: 'border-box',
    borderRadius: 4,
    color: hexAlpha('#FFFFFF', 0.9),
    textShadow:
      '0px 1px 4px rgba(0, 0, 0, 0.20), 0px 36px 100px rgba(0, 0, 0, 0.70)',
    textAlign: 'center',
  },
  variants: {
    selected: {
      true: {
        backgroundColor: hexAlpha('#FFFFFF', 0.2),
      },
    },
    type: {
      icon: [
        FONT.icon,
        {
          padding: '2px 11px',
        },
      ],
      'text-bold': [
        FONT.headline.regular,
        {
          padding: '4px 11px',
        },
      ],
      text: [
        FONT.body.emphasized,
        {
          padding: '4px 11px',
        },
      ],
    },
  },
});

darkModeStyle(container.classNames.base, {
  color: '#FFF',
  textShadow:
    '0px 36px 100px rgba(0, 0, 0, 0.70), 0px 1px 4px rgba(0, 0, 0, 0.20)',
});
