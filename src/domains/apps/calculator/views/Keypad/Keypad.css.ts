import { recipe } from '@vanilla-extract/recipes';

export const keypad = recipe({
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
