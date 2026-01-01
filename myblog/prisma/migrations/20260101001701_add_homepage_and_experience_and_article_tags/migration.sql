/*
  Warnings:

  - The `visibility` column on the `Article` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."Article" ADD COLUMN     "tags" TEXT[],
DROP COLUMN "visibility",
ADD COLUMN     "visibility" TEXT NOT NULL DEFAULT 'public';

-- DropEnum
DROP TYPE "public"."Visibility";

-- CreateTable
CREATE TABLE "public"."Homepage" (
    "id" TEXT NOT NULL,
    "sloganZh" TEXT NOT NULL DEFAULT '',
    "sloganEn" TEXT NOT NULL DEFAULT '',
    "sloganFr" TEXT NOT NULL DEFAULT '',
    "aboutZh" TEXT NOT NULL,
    "aboutEn" TEXT NOT NULL,
    "aboutFr" TEXT NOT NULL,
    "featuredProjectIds" TEXT[],
    "featuredPostIds" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Homepage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Experience" (
    "id" TEXT NOT NULL,
    "titleZh" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "titleFr" TEXT NOT NULL,
    "organization" TEXT NOT NULL,
    "location" TEXT,
    "descriptionZh" TEXT NOT NULL,
    "descriptionEn" TEXT NOT NULL,
    "descriptionFr" TEXT NOT NULL,
    "tags" TEXT[],
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Experience_pkey" PRIMARY KEY ("id")
);
