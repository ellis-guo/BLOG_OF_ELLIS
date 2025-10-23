-- CreateTable
CREATE TABLE "public"."Profile" (
    "id" TEXT NOT NULL,
    "bioZh" TEXT,
    "bioEn" TEXT,
    "bioFr" TEXT,
    "email" TEXT,
    "github" TEXT,
    "linkedin" TEXT,
    "twitter" TEXT,
    "wechat" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Post" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'article',
    "slug" TEXT NOT NULL,
    "titleZh" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "titleFr" TEXT NOT NULL,
    "contentZh" TEXT NOT NULL,
    "contentEn" TEXT NOT NULL,
    "contentFr" TEXT NOT NULL,
    "visibility" TEXT NOT NULL DEFAULT 'public',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Post_slug_key" ON "public"."Post"("slug");
