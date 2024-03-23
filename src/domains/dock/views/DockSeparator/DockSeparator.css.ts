import { globalStyle, style } from '@vanilla-extract/css';
import { darkModeSelector } from 'utils/broswer';

export const separator_container = style({
  width: 22,
  height: 64,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const separator = style({
  width: 1,
  height: 45,
  borderRadius: 1,
  backgroundColor: '#E8E8E8',
});

globalStyle(`${darkModeSelector} ${separator}`, {
  backgroundColor: '#B5B5B5',
});
