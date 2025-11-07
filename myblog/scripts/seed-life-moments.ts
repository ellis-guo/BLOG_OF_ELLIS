import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 开始插入 LifeMoment 测试数据...");

  const moments = [
    {
      imageUrl:
        "https://res.cloudinary.com/ellisguo/image/upload/v1762472828/test1_wtgauo.jpg",
      caption: "Beautiful Sunset",
      intro:
        "A peaceful evening watching the sun go down, reminding me to appreciate the simple moments in life.",
      order: 0,
      time: new Date("2024-01-15"),
    },
    {
      imageUrl:
        "https://res.cloudinary.com/ellisguo/image/upload/v1762472828/test3_z03nxo.jpg",
      caption: "City Adventures",
      intro:
        "Exploring the urban landscape and discovering hidden gems in the heart of the city.",
      order: 1,
      time: new Date("2024-02-20"),
    },
    {
      imageUrl:
        "https://res.cloudinary.com/ellisguo/image/upload/v1762472828/test2_bhagf3.jpg",
      caption: "Nature Escape",
      intro:
        "Taking a break from the busy life to reconnect with nature and find inner peace.",
      order: 2,
      time: new Date("2024-03-10"),
    },
  ];

  for (const moment of moments) {
    const created = await prisma.lifeMoment.create({
      data: moment,
    });
    console.log(`✅ 已创建: ${created.caption}`);
  }

  console.log("🎉 完成!已插入 3 条 LifeMoment 数据");
}

main()
  .catch((e) => {
    console.error("❌ 错误:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
