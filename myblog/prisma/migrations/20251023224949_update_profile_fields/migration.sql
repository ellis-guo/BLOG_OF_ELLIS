-- AlterTable
ALTER TABLE "public"."Profile" ADD COLUMN     "photoUrl" TEXT;

-- CreateTable
CREATE TABLE "public"."LifeMoment" (
    "id" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "caption" TEXT,
    "intro" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LifeMoment_pkey" PRIMARY KEY ("id")
);
