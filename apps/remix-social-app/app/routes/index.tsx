// import { Link } from "@remix-run/react";
import { styled, theme } from "~/styles/stitches.config";

// import { useOptionalUser } from "~/utils";

const Container = styled("main", {
  position: "relative",
  minHeight: "100vh",
  background: theme.colors.white,
  "@sm": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default function Index() {
  // const user = useOptionalUser();
  return (
    <Container>
      <h1>Welcome to Remix Social</h1>
    </Container>
  );
}
