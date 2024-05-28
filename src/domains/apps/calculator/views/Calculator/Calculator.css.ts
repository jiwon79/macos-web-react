import { style } from '@vanilla-extract/css';
import { calcColorTokens } from '../theme.css';

export const movableArea = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  backgroundColor: calcColorTokens.grey700,
  flex: 1,
  padding: '8px 8px 8px 0',
});

export const displayContainer = style({});

export const displayText = style({
  fontSize: 24,
  textAlign: 'right',
});
