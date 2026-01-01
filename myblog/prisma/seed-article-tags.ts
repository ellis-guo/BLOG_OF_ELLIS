import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 开始为现有 Articles 添加 tags...");

  // Get all articles
  const articles = await prisma.article.findMany();

  if (articles.length === 0) {
    console.log("⚠️  没有找到文章，请先创建一些文章");
    return;
  }

  // Update each article with sample tags
  for (const article of articles) {
    let tags: string[] = [];

    if (article.type === "project") {
      // Projects get tech stack tags
      tags = ["Next.js", "TypeScript", "React", "Tailwind CSS"];
    } else {
      // Posts get category tags
      tags = ["Tutorial", "Web Development", "JavaScript"];
    }

    await prisma.article.update({
      where: { id: article.id },
      data: { tags },
    });

    console.log(`✅ 已更新 ${article.titleEn}: ${tags.join(", ")}`);
  }

  console.log("🎉 完成！所有文章都已添加 tags");
}

main()
  .catch((e) => {
    console.error("❌ 错误:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
