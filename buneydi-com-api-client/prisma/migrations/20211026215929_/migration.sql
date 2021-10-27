/*
  Warnings:

  - You are about to drop the `CommentDislike` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PostDislike` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CommentDislike" DROP CONSTRAINT "CommentDislike_commentId_fkey";

-- DropForeignKey
ALTER TABLE "CommentDislike" DROP CONSTRAINT "CommentDislike_userId_fkey";

-- DropForeignKey
ALTER TABLE "PostDislike" DROP CONSTRAINT "PostDislike_postId_fkey";

-- DropForeignKey
ALTER TABLE "PostDislike" DROP CONSTRAINT "PostDislike_userId_fkey";

-- DropTable
DROP TABLE "CommentDislike";

-- DropTable
DROP TABLE "PostDislike";
