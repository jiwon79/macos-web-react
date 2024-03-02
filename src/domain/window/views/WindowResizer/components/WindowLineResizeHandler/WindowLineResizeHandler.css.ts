import { CSSProperties } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

const verticalLineStyle: CSSProperties = {
  height: 12,
  width: '100%',
  cursor: 'ns-resize',
};

const horizontalLineStyle: CSSProperties = {
  width: 12,
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
        top: 0,
        ...verticalLineStyle,
      },
      right: {
        right: 0,
        ...horizontalLineStyle,
      },
      bottom: {
        bottom: 0,
        ...verticalLineStyle,
      },
      left: {
        left: 0,
        ...horizontalLineStyle,
      },
    },
  },
});
