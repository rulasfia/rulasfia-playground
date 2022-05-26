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
    fontSizes: {
      sm: "0.875rem",
      md: "1rem",
      lg: "1.125rem",
    },
    lineHeights: {
      sm: "1.25rem",
      md: "1.5rem",
      lg: "1.75rem",
    },
  },
  media: {
    sm: "(min-width: 640px)",
    md: "(min-width: 768px)",
    lg: "(min-width: 1024px)",
    xl: "(min-width: 1680px)",
  },
  utils: {
    mx: (value: string) => ({
      marginLeft: value,
      marginRight: value,
    }),
    my: (value: string) => ({
      marginTop: value,
      marginBottom: value,
    }),
    px: (value: string) => ({
      paddingLeft: value,
      paddingRight: value,
    }),
    py: (value: string) => ({
      paddingTop: value,
      paddingBottom: value,
    }),
  },
});

const { styled, globalCss, getCssText, theme, config } = stitches;

const defaultFonts = "'IBM Plex Sans', sans-serif";

const injectGlobalStyles = stitches.globalCss({
  "*": { boxSizing: "border-box", fontFamily: defaultFonts },
  "*:after": { boxSizing: "border-box", fontFamily: defaultFonts },
  "*:before": { boxSizing: "border-box", fontFamily: defaultFonts },
  body: { margin: 0, padding: 0 },
  h1: { margin: 0 },
  h2: { margin: 0 },
  h3: { margin: 0 },
  a: {
    color: "$gray12",
    textDecoration: "none",
    "&:hover": { color: "$gray11" },
  },
});

injectGlobalStyles();

export { styled, getCssText, globalCss, theme, config };
