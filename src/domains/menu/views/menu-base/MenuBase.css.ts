import { recipe } from '@vanilla-extract/recipes';
import { darkModeStyle, font } from 'third-parties/vanilla-extract';

export const container = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    height: 24,
    boxSizing: 'border-box',
    borderRadius: 4,
    color: '#000',
    textAlign: 'center',
  },
  variants: {
    selected: {
      true: {
        backgroundColor: 'rgba(255, 255, 255, 0.35)',
      },
    },
    type: {
      'apple-logo': {
        padding: '2px 11px',
      },
      'app-name': [
        font.headline.regular,
        {
          padding: '4px 11px',
        },
      ],
      item: [
        font.body.emphasized,
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

darkModeStyle(container.classNames.variants.selected.true, {
  background: 'rgba(0, 0, 0, 0.35)',
});
