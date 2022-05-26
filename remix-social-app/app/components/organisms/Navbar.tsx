import { styled, theme } from "~/styles/stitches.config";
import Box from "../atoms/layouts/Box";
import LinkTo from "../atoms/LinkTo";

const Nav = styled("nav", {
  height: "75px",
  position: "sticky",
  top: "0",
  zIndex: "10",
  px: "32px",
  borderBottom: "1px solid",
  borderBottomColor: theme.colors.gray7,
  color: theme.colors.violet11,
  backgroundColor: theme.colors.white,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export default function Navbar() {
  return (
    <Nav>
      <h3>
        <LinkTo css={{ color: "$violet10" }} to="/">
          Remix Social
        </LinkTo>
      </h3>

      <Box>
        <LinkTo
          css={{ fontSize: "1rem", "&:hover": { color: "$violet10" } }}
          to="/about"
        >
          About
        </LinkTo>
      </Box>
    </Nav>
  );
}
