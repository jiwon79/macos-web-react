import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const displayContainer = style({
  height: 50,
});

export const display = style({
  fontSize: 24,
  textAlign: 'right',
});

export const buttonContainer = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '1px',
});

export const button = recipe({
  base: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    outline: 'none',
    border: 'none',
  },
  variants: {
    type: {
      number: {
        backgroundColor: 'gray',

        '&:active': {
          backgroundColor: 'darkgray',
        },
      },
      number_wide: {
        backgroundColor: 'gray',
        gridColumn: 'span 2',

        '&:active': {
          backgroundColor: 'darkgray',
        },
      },
      operator: {
        backgroundColor: 'orange',

        '&:active': {
          backgroundColor: 'darkorange',
        },
      },
      function: {
        backgroundColor: 'green',

        '&:active': {
          backgroundColor: 'darkgreen',
        },
      },
    },
  },
});
