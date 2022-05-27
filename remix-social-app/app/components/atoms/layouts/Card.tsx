import { styled, theme } from "~/styles/stitches.config";

const Card = styled("main", {
  px: "1rem",
  py: "1rem",
  borderRadius: "14px",
  borderStyle: "solid",
  borderWidth: "1px",
  borderColor: theme.colors.gray7,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",

  "&:hover": {
    borderColor: theme.colors.gray8,
  },
});

export const CardTitle = styled("h5", {
  margin: 0,
  fontWeight: "500",
  fontSize: theme.fontSizes.lg,
  marginBottom: "0.5rem",
});

export const CardBody = styled("p", {
  margin: 0,
  fontWeight: "400",
  fontSize: theme.fontSizes.sm,
  color: theme.colors.gray10,
  marginBottom: "0.5rem",
});

export const CardFooter = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderTopStyle: "solid",
  borderTopWidth: "1px",
  borderTopColor: theme.colors.gray6,
  paddingTop: "0.5rem",
});

export default Card;
