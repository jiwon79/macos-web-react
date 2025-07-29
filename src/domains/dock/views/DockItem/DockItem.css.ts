import { keyframes, style } from '@vanilla-extract/css';

const minimizeAnimation = keyframes({
  '0%': { transform: 'scaleX(0)' },
  '100%': { transform: 'scaleX(1)' },
});

export const item = style({
  position: 'relative',
  display: 'flex',
  height: 'min-content',
});

export const icon = style({
  width: 50,
  height: 50,
  marginBottom: 10,
});

export const animatingIcon = style({
  width: 50,
  height: 50,
  marginBottom: 10,
  animation: `${minimizeAnimation} 0.3s ease-out forwards`,
  transformOrigin: 'center',
});

export const openIndicator = style({
  position: 'absolute',
  bottom: 4,
  left: '50%',
  transform: 'translateX(-50%)',
});
