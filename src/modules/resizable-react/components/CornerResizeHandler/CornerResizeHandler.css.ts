import { recipe } from "@vanilla-extract/recipes";

export const point = recipe({
  base: {
    position: "absolute",
    width: 12,
    height: 12,
    borderRadius: "50%",
    border: "1px solid $blue",
    background: "$grey0",
    zIndex: 100,
    pointerEvents: "all"
  },
  variants: {
    position: {
      "top-left": {
        top: -6,
        left: -6,
        cursor: "nwse-resize"
      },
      "top-right": {
        top: -6,
        right: -6,
        cursor: "nesw-resize"
      },
      "bottom-left": {
        bottom: -6,
        left: -6,
        cursor: "nesw-resize"
      },
      "bottom-right": {
        bottom: -6,
        right: -6,
        cursor: "nwse-resize"
      }
    }
  }
});
