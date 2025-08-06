import { type GlobalStyleRule, globalStyle } from "@vanilla-extract/css";
import { darkModeSelector } from "utils/browser";

export function darkModeStyle(selector: string, rule: GlobalStyleRule) {
  globalStyle(`${darkModeSelector} ${selector}`, rule);
}
