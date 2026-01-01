import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Initializing Homepage data...");

  // Check if homepage already exists
  const existing = await prisma.homepage.findFirst();

  if (existing) {
    console.log("✅ Homepage already exists, skipping...");
    return;
  }

  // Create initial homepage record
  const homepage = await prisma.homepage.create({
    data: {
      sloganZh: "构建现代化的全栈 Web 应用",
      sloganEn: "Building modern full-stack web applications",
      sloganFr: "Construire des applications web full-stack modernes",

      aboutZh: "请编辑此处添加详细介绍...",
      aboutEn: "Please edit to add detailed introduction...",
      aboutFr: "Veuillez modifier pour ajouter une introduction détaillée...",

      featuredProjectIds: [],
      featuredPostIds: [],
    },
  });

  console.log("✅ Created initial Homepage record:", homepage.id);
  console.log("🎉 Done!");
}

main()
  .catch((e) => {
    console.error("❌ Error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
