import { recipe } from "@vanilla-extract/recipes";
import { calcColorTokens } from "../theme.css";

export const keypad = recipe({
  base: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    outline: "none",
    border: "none",
    fontSize: 21
  },
  variants: {
    type: {
      number: {
        backgroundColor: calcColorTokens.grey500,

        "&:active": {
          backgroundColor: calcColorTokens.grey300
        }
      },
      number_wide: {
        backgroundColor: calcColorTokens.grey500,
        gridColumn: "span 2",

        "&:active": {
          backgroundColor: calcColorTokens.grey300
        }
      },
      operator: {
        backgroundColor: calcColorTokens.orange,

        "&:active": {
          backgroundColor: calcColorTokens.darkOrange
        }
      },
      function: {
        backgroundColor: calcColorTokens.grey600,

        "&:active": {
          backgroundColor: calcColorTokens.grey500
        }
      }
    }
  }
});
