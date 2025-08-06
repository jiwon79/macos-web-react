import { globalStyle, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { darkModeStyle, FONT } from "third-parties/vanilla-extract";
import { hexAlpha } from "utils/style";

export const submenuContainer = style({
  display: "flex",
  flexDirection: "column"
});

export const submenuButton = recipe({
  base: [
    FONT.body.regular,
    {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",

      height: 22,
      padding: "0 9px",
      borderRadius: 4,

      border: "none",
      outline: "none",
      backgroundColor: "transparent"
    }
  ],
  variants: {
    disabled: {
      false: {
        ":hover": {
          backgroundColor: "#007AFF"
        }
      }
    }
  }
});

const submenuButton__variants_disabled_false =
  submenuButton.classNames.variants.disabled.false;

darkModeStyle(`${submenuButton__variants_disabled_false}:hover`, {
  backgroundColor: "#0A84FF"
});

export const submenuText = recipe({
  base: {
    color: hexAlpha("#0A0A0A", 0.9),
    whiteSpace: "nowrap",
    width: "fit-content",
    marginRight: 40
  },
  variants: {
    disabled: {
      true: {
        color: hexAlpha("#5A5A5A", 0.4)
      }
    }
  }
});

const submenuText__base = submenuText.classNames.base;
const submenuText__disabled_true =
  submenuText.classNames.variants.disabled.true;

darkModeStyle(submenuText__base, {
  color: "#DFDEDF"
});

darkModeStyle(submenuText__disabled_true, {
  color: hexAlpha("#DFDEDF", 0.4)
});

globalStyle(
  `${submenuButton__variants_disabled_false}:hover ${submenuText__base}`,
  {
    color: "#FFFFFF"
  }
);

export const submenuShortcutText = style({
  color: "rgba(60, 60, 67, 0.40)"
});

darkModeStyle(submenuShortcutText, {
  color: "rgba(235, 235, 245, 0.40)"
});

globalStyle(
  `${submenuButton__variants_disabled_false}:hover ${submenuShortcutText}`,
  {
    color: "#FFFFFF"
  }
);
