import { GlobalStyleRule, globalStyle } from '@vanilla-extract/css';
import { darkModeSelector } from 'utils/broswer';

export function darkModeStyle(selector: string, rule: GlobalStyleRule) {
  globalStyle(`${darkModeSelector} ${selector}`, rule);
}
