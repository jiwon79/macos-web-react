import { globalStyle } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { darkModeSelector } from 'utils/broswer';

export const dockIcon = recipe({
  base: {
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  variants: {
    open: {
      true: {
        backgroundColor: '#4D4D4D',
      },
      false: {
        backgroundColor: 'transparent',
      },
    },
  },
});

globalStyle(`${darkModeSelector} ${dockIcon.classNames.variants.open.true}`, {
  backgroundColor: '#FFFFFF',
});
