import { styled, theme } from "~/styles/stitches.config";
import Button from "~/components/atoms/Button";
import Box from "~/components/atoms/layouts/Box";
import ArrowSmRight from "~/components/atoms/icons/ArrowSmRight";
import LinkTo from "~/components/atoms/LinkTo";

// import { useOptionalUser } from "~/utils";

const Container = styled("main", {
  position: "relative",
  minHeight: "calc(100vh - 75px)",
  background: theme.colors.white,
  "@sm": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

const Title = styled("h1", {
  fontSize: "3rem",
  color: theme.colors.violet12,
});

const Subtitle = styled("h5", {
  fontSize: theme.fontSizes.lg,
  fontWeight: "500",
  margin: 0,
  color: theme.colors.gray11,
});

export default function Index() {
  // const user = useOptionalUser();
  return (
    <Container>
      <Box type="vstack" position="allCenter">
        <Title>Welcome to Remix Social</Title>
        <Subtitle>Created by @rulasfia</Subtitle>

        <Box
          css={{ my: "2rem", gap: "2rem" }}
          type="hstack"
          position="allCenter"
        >
          <LinkTo
            css={{
              "&:focus-visible": {
                borderRadius: "12px",
                outline: "none",
                boxShadow: `0 0 0 4px ${theme.colors.violet7}`,
              },
            }}
            to="/join"
          >
            <Button focus={false} type="button" size="lg" withIcon link>
              Get Started
              <ArrowSmRight css={{ height: "28px", width: "28px" }} />
            </Button>
          </LinkTo>
        </Box>
      </Box>
    </Container>
  );
}
