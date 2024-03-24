import { globalStyle, style } from '@vanilla-extract/css';
import { darkModeSelector } from 'utils/broswer';

export const desktop = style({
  position: 'relative',
  width: '100%',
  height: '100%',
  backgroundImage: 'url(/src/assets/wallpapers/wallpaper_light.png)',
});

globalStyle(`${darkModeSelector} ${desktop}`, {
  backgroundImage: 'url(/src/assets/wallpapers/wallpaper_dark.png)',
});
