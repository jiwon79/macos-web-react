import { style } from "@vanilla-extract/css";
import { calcColorTokens } from "../theme.css";

export const keypadContainer = style({
  display: "grid",
  gridTemplateColumns: "56px 57px 57px 59px",
  gridTemplateRows: "repeat(5, 47px)",
  gap: "1px",
  backgroundColor: calcColorTokens.grey700
});
