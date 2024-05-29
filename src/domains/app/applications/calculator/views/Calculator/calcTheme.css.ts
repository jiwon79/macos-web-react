import { createTheme } from '@vanilla-extract/css';

export const [calcThemeClass, calcStyleTokens] = createTheme({
  color: {
    grey000: '#FFFFFF',
    grey300: '#909090',
    grey500: '#5A5A5A',
    grey600: '#3F3F3F',
    grey700: '#2C2C2C',
    orange: '#F1951A',
    darkOrange: '#BF802D',
  },
});

export const calcColorTokens = calcStyleTokens.color;
