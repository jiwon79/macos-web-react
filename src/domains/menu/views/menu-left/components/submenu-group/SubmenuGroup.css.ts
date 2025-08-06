import { style } from "@vanilla-extract/css";
import { darkModeStyle } from "third-parties/vanilla-extract";
import { hexAlpha } from "utils/style";

export const container = style({
  display: "flex",
  flexDirection: "column",
  borderRadius: 6,

  background: hexAlpha("#FFFFFF", 0.64),
  backdropFilter: "blur(25px)",
  boxShadow: "0px 0px 20px 0px rgba(0, 0, 0, 0.15)",

  padding: 5
});

darkModeStyle(container, {
  border: "1px solid rgba(165, 165, 165, 0.40)",
  background: "rgba(30, 30, 30, 0.20)",
  boxShadow: "0px 0px 0px 0.5px rgba(0, 0, 0, 0.25)"
});
