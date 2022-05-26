import { createStitches } from "@stitches/react";
import { gray, red, violet, green } from "@radix-ui/colors";

const stitches = createStitches({
  theme: {
    colors: {
      ...gray,
      ...red,
      ...violet,
      ...green,
      black: "#000",
      white: "#fff",
    },
  },
  media: {
    sm: "(min-width: 640px)",
    md: "(min-width: 768px)",
    lg: "(min-width: 1024px)",
    xl: "(min-width: 1680px)",
  },
});

const { styled, globalCss, getCssText, theme } = stitches;

export { styled, getCssText, globalCss, theme };
