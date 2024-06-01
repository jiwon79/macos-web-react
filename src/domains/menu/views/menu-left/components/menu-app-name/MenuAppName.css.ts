import { style } from '@vanilla-extract/css';
import { font } from 'third-parties/vanilla-extract';

export const container = style([
  font.headline.regular,
  {
    padding: '4px 11px',
  },
]);
