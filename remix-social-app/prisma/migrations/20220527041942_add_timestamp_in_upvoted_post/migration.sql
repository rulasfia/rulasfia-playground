-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UpvotedPost" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    CONSTRAINT "UpvotedPost_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "UpvotedPost_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_UpvotedPost" ("id", "postId", "userId") SELECT "id", "postId", "userId" FROM "UpvotedPost";
DROP TABLE "UpvotedPost";
ALTER TABLE "new_UpvotedPost" RENAME TO "UpvotedPost";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
