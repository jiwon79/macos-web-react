import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { darkModeStyle, FONT } from 'third-parties/vanilla-extract';
import { hexAlpha } from 'utils/style';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  borderRadius: 6,

  background: hexAlpha('#FFFFFF', 0.64),
  backdropFilter: 'blur(25px)',
  boxShadow: '0px 0px 20px 0px rgba(0, 0, 0, 0.15)',

  padding: 5,
});

darkModeStyle(container, {
  border: '1px solid rgba(165, 165, 165, 0.40)',
  background: 'rgba(30, 30, 30, 0.20)',
  boxShadow: '0px 0px 0px 0.5px rgba(0, 0, 0, 0.25)',
});

export const submenuContainer = style({
  display: 'flex',
  flexDirection: 'column',
});

export const submenuButton = recipe({
  base: [
    FONT.body.regular,
    {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',

      height: 22,
      padding: '0 9px',
      borderRadius: 4,

      border: 'none',
      outline: 'none',
      backgroundColor: 'transparent',
    },
  ],
  variants: {
    disabled: {
      false: {
        ':hover': {
          backgroundColor: '#007AFF',
        },
      },
    },
  },
});

darkModeStyle(`${submenuButton.classNames.variants.disabled.false}:hover`, {
  backgroundColor: '#0A84FF',
});

export const submenuText = recipe({
  base: {
    color: hexAlpha('#0A0A0A', 0.9),
    whiteSpace: 'nowrap',
    width: 'fit-content',
    marginRight: 40,
  },
  variants: {
    disabled: {
      true: {
        color: hexAlpha('#5A5A5A', 0.4),
      },
    },
  },
});

darkModeStyle(submenuText.classNames.base, {
  color: '#DFDEDF',
});

darkModeStyle(submenuText.classNames.variants.disabled.true, {
  color: hexAlpha('#DFDEDF', 0.4),
});

globalStyle(
  `${submenuButton.classNames.variants.disabled.false}:hover ${submenuText.classNames.base}`,
  {
    color: '#FFFFFF',
  }
);

export const submenuShortcutText = style({
  color: 'rgba(60, 60, 67, 0.40)',
});

darkModeStyle(submenuShortcutText, {
  color: 'rgba(235, 235, 245, 0.40)',
});

globalStyle(
  `${submenuButton.classNames.variants.disabled.false}:hover ${submenuShortcutText}`,
  {
    color: '#FFFFFF',
  }
);

export const divider = style({
  border: 'none',
  backgroundColor: 'rgba(60, 60, 67, 0.18)',

  width: 'calc(100% - 18px)',
  height: '1px',
  margin: '5px 9px',
});

darkModeStyle(divider, {
  backgroundColor: hexAlpha('#EBEBF5', 0.18),
});
