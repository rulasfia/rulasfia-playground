import { styled, theme } from "~/styles/stitches.config";

const Button = styled("button", {
  width: "fit-content",
  borderWidth: "2px",
  borderColor: "transparent",
  borderStyle: "solid",
  transitionProperty: "all",
  transitionTimingFunction: "cubic-bezier(0.4, 0, 1, 1)",
  transitionDuration: "50ms",

  variants: {
    focus: {
      true: {
        "&:focus:not(:focus-visible)": {
          outline: "none",
          boxShadow: `0 0 0 1px ${theme.colors.violet7}`,
        },
        "&:focus-visible": {
          outline: "none",
          boxShadow: `0 0 0 4px ${theme.colors.violet7}`,
        },
      },
      false: {
        "&:focus:not(:focus-visible)": {
          outline: "none",
        },
        "&:focus-visible": {
          outline: "none",
        },
      },
    },
    variant: {
      solid: {
        fontWeight: "500",
        borderColor: theme.colors.violet9,
        backgroundColor: theme.colors.violet9,
        color: theme.colors.white,
        "&:hover": {
          borderColor: theme.colors.violet10,
          backgroundColor: theme.colors.violet10,
        },
      },
      outline: {
        fontWeight: "500",
        borderColor: theme.colors.violet7,
        backgroundColor: theme.colors.white,
        color: theme.colors.violet11,
        "&:hover": {
          borderColor: theme.colors.violet8,
          backgroundColor: theme.colors.violet3,
        },
      },
    },
    size: {
      sm: {
        px: "16px",
        py: "8px",
        fontSize: "0.75rem",
        borderRadius: "6px",
      },
      md: {
        px: "20px",
        py: "10px",
        fontSize: "1rem",
        borderRadius: "10px",
      },
      lg: {
        px: "25px",
        py: "12px",
        borderRadius: "12px",
        fontSize: "1.25rem",
      },
    },
    link: {
      true: {
        cursor: "pointer",
      },
    },
    withIcon: {
      true: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: "0.3rem",
      },
    },
  },

  defaultVariants: {
    variant: "solid",
    size: "md",
    focus: true,
  },
});

export default Button;
