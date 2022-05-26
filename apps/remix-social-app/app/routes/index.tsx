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

const Box = styled("div");

const Title = styled("h1", {
  fontSize: "3rem",
  color: theme.colors.violet12,
});

const Subtitle = styled("h5", {
  fontSize: "1.25rem",
  fontWeight: "500",
  margin: 0,
  color: theme.colors.gray10,
});

export default function Index() {
  // const user = useOptionalUser();
  return (
    <Container>
      <Box
        css={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Title>Welcome to Remix Social</Title>
        <Subtitle>Created by @rulasfia</Subtitle>
      </Box>
    </Container>
  );
}
