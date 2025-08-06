import { style } from "@vanilla-extract/css";
import { darkModeStyle } from "third-parties/vanilla-extract";
import { hexAlpha } from "utils/style";

export const divider = style({
  border: "none",
  backgroundColor: "rgba(60, 60, 67, 0.18)",

  width: "calc(100% - 18px)",
  height: "1px",
  margin: "5px 9px"
});

darkModeStyle(divider, {
  backgroundColor: hexAlpha("#EBEBF5", 0.18)
});
