import { style } from '@vanilla-extract/css';

export const displayContainer = style({
  height: 50,
});

export const display = style({
  fontSize: 24,
  textAlign: 'right',
});

export const keypadContainer = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '1px',
});
