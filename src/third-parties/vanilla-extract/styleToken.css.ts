import { style } from '@vanilla-extract/css';

export const font = {
  headline: {
    regular: style({
      fontFamily: 'Pretendard',
      fontWeight: 700,
      fontSize: 13,
      lineHeight: 16,
    }),

    emphasized: style({
      fontFamily: 'Pretendard',
      fontWeight: 900,
      fontSize: 13,
      lineHeight: 16,
    }),
  },

  body: {
    regular: style({
      fontFamily: 'Pretendard',
      fontWeight: 400,
      fontSize: 13,
      lineHeight: 16,
    }),

    emphasized: style({
      fontFamily: 'Pretendard',
      fontWeight: 600,
      fontSize: 13,
      lineHeight: 16,
    }),
  },
};
