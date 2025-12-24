-- AlterTable
ALTER TABLE "public"."Article" ADD COLUMN     "descriptionEn" TEXT,
ADD COLUMN     "descriptionFr" TEXT,
ADD COLUMN     "descriptionZh" TEXT,
ALTER COLUMN "author" SET DEFAULT 'Ellis Guo (郭世越)';
