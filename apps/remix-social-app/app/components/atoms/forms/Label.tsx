import { styled, theme } from "~/styles/stitches.config";

const Label = styled("label", {
  display: "block",
  fontWeight: "500",
  fontSize: theme.fontSizes.sm,
  lineHeight: theme.lineHeights.sm,
  color: theme.colors.gray11,
});

export default Label;
