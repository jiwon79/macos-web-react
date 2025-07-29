import { style } from '@vanilla-extract/css';

export const item = style({
  position: 'relative',
  display: 'flex',
  height: 'min-content',
});

export const icon = style({
  width: 50,
  height: 50,
  objectFit: 'contain',
  marginBottom: 10,
});

export const openIndicator = style({
  position: 'absolute',
  bottom: 4,
  left: '50%',
  transform: 'translateX(-50%)',
});
