/*
  Warnings:

  - The `visibility` column on the `Article` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "public"."Visibility" AS ENUM ('public', 'guest', 'draft');

-- AlterTable
ALTER TABLE "public"."Article" DROP COLUMN "visibility",
ADD COLUMN     "visibility" "public"."Visibility" NOT NULL DEFAULT 'public';
