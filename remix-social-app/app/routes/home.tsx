import type { LoaderFunction } from "@remix-run/node";
import type { Post } from "@prisma/generated/client";
import { json } from "@remix-run/node";
import * as React from "react";
import { Form, useLoaderData } from "@remix-run/react";
import { HeartFilledIcon } from "@radix-ui/react-icons";
import Card, {
  CardBody,
  CardFooter,
  CardTitle,
} from "~/components/atoms/layouts/Card";

import { getPostListItems } from "~/models/post.server";
import { styled, theme } from "~/styles/stitches.config";
import Box from "~/components/atoms/layouts/Box";
import { useOptionalUser } from "~/utils";
import { getUserUpvotedPostItems } from "~/models/upvotedPost.server";
import { requireUserId } from "~/session.server";

const Container = styled("main", {
  display: "flex",
  flexDirection: "column",
  minHeight: "calc(100vh - 75px)",
  height: "100%",
  width: "100%",
  mx: "auto",
  py: "1rem",
  "@sm": { maxWidth: theme.sizes.sm, px: "0.5rem" },
  "@md": { maxWidth: theme.sizes.md, px: "1rem" },
  "@lg": { maxWidth: theme.sizes.lg, px: "2rem" },
  "@xl": { maxWidth: theme.sizes.xl, px: "2.5rem" },
});

const Title = styled("h1", {
  fontSize: "2rem",
  fontWeight: "600",
  marginBottom: "1rem",
  color: theme.colors.gray12,
});

const UpvoteBox = styled("div", {
  display: "flex",
  flexDirection: "row",
  justifyContent: "end",
  alignItems: "center",
  gap: "0.75rem",
  height: "24px",
  width: "fit-content",
  color: theme.colors.gray11,
});

const UpvoteButton = styled(HeartFilledIcon, {
  "&:hover": {
    cursor: "pointer",
    color: theme.colors.red9,
  },
  variants: {
    voted: {
      true: {
        color: theme.colors.red10,
      },
      false: {
        color: theme.colors.gray9,
      },
    },
  },

  defaultVariants: {
    voted: false,
  },
});

type LoaderData = {
  postListItems: Awaited<ReturnType<typeof getPostListItems>>;
  userUpvotedPostiItems: Awaited<ReturnType<typeof getUserUpvotedPostItems>>;
};

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);

  const postListItems = await getPostListItems();
  const userUpvotedPostiItems = await getUserUpvotedPostItems(userId);
  return json<LoaderData>({ postListItems, userUpvotedPostiItems });
};

export default function HomePage() {
  const data = useLoaderData() as LoaderData;
  const user = useOptionalUser();

  console.log(data);
  const [upvoted, setUpvoted] = React.useState(false);

  const isUserUpvoted = React.useCallback(
    (postId: Post["id"]) => {
      const isUpvoted = data.userUpvotedPostiItems.find(
        (up) => up.postId === postId
      );

      if (!isUpvoted) return false;
      return true;
    },
    [data.userUpvotedPostiItems]
  );

  return (
    <Container>
      <Title>Home</Title>
      <Box css={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {data.postListItems.map((post) => (
          <Card key={post.id}>
            <CardTitle>{post.title}</CardTitle>
            <CardBody>{post.body}</CardBody>
            <CardFooter>
              <span>{post.user.email}</span>
              <Form method="post">
                <UpvoteBox>
                  <UpvoteButton
                    onClick={() => setUpvoted((v) => !v)}
                    voted={isUserUpvoted(post.id)}
                  />
                  {post.upvoteCount}
                  <input type="hidden" name="postId" value={post.id} />
                  <input type="hidden" name="userId" value={user?.id} />
                  <input
                    type="hidden"
                    name="action"
                    value={String(isUserUpvoted(post.id))}
                  />
                </UpvoteBox>
              </Form>
            </CardFooter>
          </Card>
        ))}
      </Box>
    </Container>
  );
}
