import { recipe } from "@vanilla-extract/recipes";
import { darkModeStyle } from "third-parties/vanilla-extract";

export const dockIcon = recipe({
  base: {
    width: 4,
    height: 4,
    borderRadius: 2
  },
  variants: {
    open: {
      true: {
        backgroundColor: "#4D4D4D"
      },
      false: {
        backgroundColor: "transparent"
      }
    }
  }
});

darkModeStyle(dockIcon.classNames.variants.open.true, {
  backgroundColor: "#FFFFFF"
});
