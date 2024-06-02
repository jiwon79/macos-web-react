import { style } from '@vanilla-extract/css';
import { darkModeStyle } from 'third-parties/vanilla-extract';

export const container = style({
  position: 'absolute',
  zIndex: 10,

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  width: '100%',
  height: 24,
  padding: '0 8px 0 4px',
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  backdropFilter: 'blur(50px)',
});

darkModeStyle(container, {
  backgroundColor: 'rgba(0, 0, 0, 0.18)',
});
