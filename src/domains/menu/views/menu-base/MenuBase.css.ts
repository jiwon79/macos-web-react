import { recipe } from '@vanilla-extract/recipes';

export const container = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    height: 24,
    boxSizing: 'border-box',
    borderRadius: 4,
  },
  variants: {
    selected: {
      true: {
        // TODO: blend로 변경
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
    },
  },
});
