import { style } from '@vanilla-extract/css';

export const movableArea = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  backgroundColor: '#383838',
  flex: 1,
  padding: '8px 8px 8px 0',
});

export const displayContainer = style({});

export const displayText = style({
  fontSize: 24,
  textAlign: 'right',
});

export const keypadContainer = style({
  display: 'grid',
  gridTemplateColumns: '56px 57px 57px 59px',
  gridTemplateRows: 'repeat(5, 47px)',
  gap: '1px',
  backgroundColor: '#383838',
});