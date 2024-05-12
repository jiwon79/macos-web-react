import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',

  width: '100%',
  height: '100%',

  backgroundColor: 'black',
  boxSizing: 'border-box',
  borderRadius: 10,
  boxShadow: `0px 0px 3px 0px rgba(255, 255, 255, 0.10) inset,
    0px 8px 40px 0px rgba(0, 0, 0, 0.25),
    0px 0px 3px 0px rgba(0, 0, 0, 0.55)`,
  overflow: 'hidden',
});
