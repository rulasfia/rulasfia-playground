import type { CSS } from "@stitches/react";
import type { config } from "~/styles/stitches.config";
import { Link } from "@remix-run/react";
import { styled } from "~/styles/stitches.config";

interface Props {
  css?: CSS<typeof config>;
  children?: string | JSX.Element;
  to: string | { pathname: string; search: string };
}

const StyledLink = styled(Link);

export default function LinkTo({ css, children, to }: Props) {
  return (
    <StyledLink css={css} to={to}>
      {children}
    </StyledLink>
  );
}
