import { globalStyle,style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const container = recipe({
  base: {
    display: 'flex',
    gap: 8,
    width: 'fit-content',
  },
  variants: {
    size: {
      standard: {
        padding: '0 20px',
      },
      mono: {
        padding: '0 13px',
      },
      withTitle: {
        padding: '0 8px',
      },
    },
  },
  defaultVariants: {
    size: 'standard',
  },
});

globalStyle(`${container.classNames.base}:hover svg`, {
  display: 'block',
});

const icon = style({
  width: 12,
  height: 12,
  borderRadius: 12,
  padding: 0,
  border: '0.5px solid rgba(0, 0, 0, 0.2)',
  color: 'rgba(0, 0, 0, 0.6)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

globalStyle(`${icon} svg`, {
  display: 'none',
});

export const closeIcon = style([
  icon,
  {
    backgroundColor: '#FF5F57',
    ':active': {
      backgroundColor: '#ff8a84',
    },
  },
]);

export const minimizeIcon = style([
  icon,
  {
    backgroundColor: '#FFBD2E',
    ':active': {
      backgroundColor: '#ffd083',
    },
  },
]);

export const maximizeIcon = style([
  icon,
  {
    backgroundColor: '#28CA41',
    ':active': {
      backgroundColor: '#88ff96',
    },
  },
]);
