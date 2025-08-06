import { style } from '@vanilla-extract/css';

export const Z_INDEX = {
  canvas: 1,
  dock: 10,
};

export const FONT = {
  icon: style({
    fontFamily: 'Pretendard',
    fontWeight: 500,
    fontSize: 16,
    lineHeight: 20 / 16,
  }),
  headline: {
    regular: style({
      fontFamily: 'Pretendard',
      fontWeight: 700,
      fontSize: 13,
      lineHeight: 16 / 13,
    }),

    emphasized: style({
      fontFamily: 'Pretendard',
      fontWeight: 900,
      fontSize: 13,
      lineHeight: 16 / 13,
    }),
  },

  body: {
    regular: style({
      fontFamily: 'Pretendard',
      fontWeight: 500,
      fontSize: 13,
      lineHeight: 16 / 13,
    }),

    emphasized: style({
      fontFamily: 'Pretendard',
      fontWeight: 600,
      fontSize: 13,
      lineHeight: 16 / 13,
    }),
  },
};
