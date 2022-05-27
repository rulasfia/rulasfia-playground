import type { Post, User } from "@prisma/generated/client";
import { prisma } from "~/db.server";

export type { Post } from "@prisma/generated/client";

export function getPost({
  id,
  userId,
}: Pick<Post, "id"> & {
  userId: User["id"];
}) {
  return prisma.post.findFirst({
    where: { id, userId },
  });
}

export function getUserPostListItems({ userId }: { userId: User["id"] }) {
  return prisma.post.findMany({
    where: { userId },
    select: { id: true, title: true },
    orderBy: { updatedAt: "desc" },
  });
}

export function getPostListItems() {
  return prisma.post.findMany({
    select: {
      id: true,
      title: true,
      body: true,
      upvoteCount: true,
      user: { select: { email: true } },
    },
    orderBy: { updatedAt: "desc" },
  });
}

export function createPost({
  body,
  title,
  userId,
}: Pick<Post, "body" | "title"> & {
  userId: User["id"];
}) {
  return prisma.post.create({
    data: {
      title,
      body,
      upvoteCount: 0,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
}

export function deletePost({
  id,
  userId,
}: Pick<Post, "id"> & {
  userId: User["id"];
}) {
  return prisma.post.deleteMany({
    where: { id, userId },
  });
}
