import type { CSS } from "@stitches/react";
import type { config } from "~/styles/stitches.config";
import { theme } from "~/styles/stitches.config";
import { Link } from "@remix-run/react";
import { styled } from "~/styles/stitches.config";

interface Props {
  css?: CSS<typeof config>;
  children?: string | JSX.Element;
  to: string | { pathname: string; search: string };
}

const StyledLink = styled(Link, {
  "&:focus:not(:focus-visible)": {
    outline: "none",
  },
  "&:focus-visible": {
    outline: "none",
    borderRadius: "4px",
    boxShadow: `0 0 0 2px ${theme.colors.violet7}`,
  },
});

export default function LinkTo({ css, children, to }: Props) {
  return (
    <StyledLink css={css} to={to}>
      {children}
    </StyledLink>
  );
}
