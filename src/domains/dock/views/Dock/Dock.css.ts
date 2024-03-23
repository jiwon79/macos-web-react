import { globalStyle, style } from '@vanilla-extract/css';
import { darkModeSelector } from 'utils/broswer';

export const container = style({
  position: 'absolute',
  bottom: 5,
  left: '50%',
  transform: 'translateX(-50%)',

  display: 'flex',
  alignItems: 'end',
  height: 65,
  padding: '0 5px',
  borderRadius: 16,

  backgroundColor: 'rgba(242, 242, 242, 0.4)',
  boxShadow: `
    0 0 6px rgba(0, 0, 0, 0.15),
    0 0 0 1px rgba(255, 255, 255, 0.54) inset`,
  backdropFilter: 'blur(12px)',
});

globalStyle(`${darkModeSelector} ${container}`, {
  backgroundColor: 'rgba(75, 75, 75, 0.4)',
  boxShadow: `
    0 0 0 1px rgba(0, 0, 0, 0.2),
    0 0 0 1px #8A8A8A inset`,
  backdropFilter: 'blur(30px)',
});
