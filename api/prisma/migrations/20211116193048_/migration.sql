-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_postId_fkey";

-- AlterTable
ALTER TABLE "Image" ALTER COLUMN "postId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;
