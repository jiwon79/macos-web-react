import { recipe } from '@vanilla-extract/recipes';
import { font } from 'third-parties/vanilla-extract';

export const container = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    height: 24,
    boxSizing: 'border-box',
    borderRadius: 4,
  },
  variants: {
    selected: {
      true: {
        // TODO: blend로 변경
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
