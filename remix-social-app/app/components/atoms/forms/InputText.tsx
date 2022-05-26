import { styled, theme } from "~/styles/stitches.config";

const Input = styled("input", {
  width: "100%",
  borderRadius: "10px",
  borderStyle: "solid",
  borderWidth: "2px",
  borderColor: theme.colors.gray7,
  px: "0.75rem",
  py: "0.35rem",
  fontSize: theme.fontSizes.lg,

  "&:focus": {
    outline: "none",
    borderColor: theme.colors.violet8,
  },
});

export default Input;
