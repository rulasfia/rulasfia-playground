import { PrismaClient } from "@prisma/generated/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  const email01 = "khoirul@remix.run";
  const email02 = "asfian@remix.run";

  // cleanup the existing database
  await prisma.user.delete({ where: { email: email01 } }).catch(() => {
    // no worries if it doesn't exist yet
  });
  await prisma.user.delete({ where: { email: email02 } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("11223344", 10);

  const user01 = await prisma.user.create({
    data: {
      email: email01,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  const user02 = await prisma.user.create({
    data: {
      email: email02,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  await prisma.note.create({
    data: {
      title: "My first note",
      body: "Hello, world!",
      userId: user01.id,
    },
  });

  await prisma.note.create({
    data: {
      title: "My second note",
      body: "Hello, world! 2",
      userId: user01.id,
    },
  });

  const post01 = await prisma.post.create({
    data: {
      title: "My first post",
      body: "Hey, world!",
      upvoteCount: 4,
      userId: user01.id,
    },
  });

  // upvote post
  await prisma.post.update({
    where: { id: post01.id },
    data: {
      upvoteCount: post01.upvoteCount + 1,
    },
  });

  // update upvoted post list
  await prisma.upvotedPost.create({
    data: {
      userId: user02.id,
      postId: post01.id,
    },
  });

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
