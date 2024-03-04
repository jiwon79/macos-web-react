import { CSSProperties } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

const verticalLineStyle: CSSProperties = {
  height: 8,
  width: '100%',
  cursor: 'ns-resize',
};

const horizontalLineStyle: CSSProperties = {
  width: 8,
  height: '100%',
  cursor: 'ew-resize',
};

export const line = recipe({
  base: {
    position: 'absolute',
  },
  variants: {
    position: {
      top: {
        top: -2,
        ...verticalLineStyle,
      },
      right: {
        right: -2,
        ...horizontalLineStyle,
      },
      bottom: {
        bottom: -2,
        ...verticalLineStyle,
      },
      left: {
        left: -2,
        ...horizontalLineStyle,
      },
    },
  },
});
