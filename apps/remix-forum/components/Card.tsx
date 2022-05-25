import { styled } from "@stitches/react";

export const Card = styled("div", {
  padding: "2rem",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "#d4d4d4",
  borderRadius: "16px",
  color: "#171717",
  maxWidth: "50vw",
  "&:hover": {
    boxShadow:
      "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);",
  },
});
