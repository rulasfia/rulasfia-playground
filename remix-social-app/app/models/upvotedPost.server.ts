import type { UpvotedPost, Post, User } from "@prisma/generated/client";
import { prisma } from "~/db.server";

export type { Post, UpvotedPost } from "@prisma/generated/client";

export function getUpvotedPost({
  id,
  userId,
}: Pick<UpvotedPost, "id"> & {
  userId: User["id"];
}) {
  return prisma.upvotedPost.findFirst({
    where: { id, userId },
  });
}

export function getUserUpvotedPostItems(userId: User["id"]) {
  return prisma.upvotedPost.findMany({
    where: { userId },
    select: { id: true, postId: true, post: true },
  });
}

export function createUpvotedPost({
  postId,
  userId,
}: Pick<UpvotedPost, "postId" | "userId">) {
  return prisma.upvotedPost.create({
    data: {
      user: {
        connect: {
          id: userId,
        },
      },
      post: {
        connect: {
          id: postId,
        },
      },
    },
  });
}

export function deleteUpvotedPost({
  id,
  userId,
  postId,
}: Pick<UpvotedPost, "id" | "postId" | "userId">) {
  return prisma.upvotedPost.deleteMany({
    where: { id, userId, postId },
  });
}
