import { style } from "@vanilla-extract/css";
import { darkModeStyle } from "third-parties/vanilla-extract";

export const separator_container = style({
  width: 22,
  height: 64,
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
});

export const separator = style({
  width: 1,
  height: 45,
  borderRadius: 1,
  backgroundColor: "#E8E8E8"
});

darkModeStyle(separator, {
  backgroundColor: "#B5B5B5"
});
