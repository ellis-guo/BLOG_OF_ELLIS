import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 开始插入 Experience 测试数据...");

  const experiences = [
    {
      titleZh: "计算机科学硕士",
      titleEn: "Master of Science in Computer Science",
      titleFr: "Master en informatique",
      organization: "Northeastern University",
      location: "Boston, MA",
      descriptionZh:
        "专注于分布式系统和云计算。课程包括：算法、数据结构、面向对象设计。使用现代 Web 技术构建全栈应用程序。",
      descriptionEn:
        "Focusing on distributed systems and cloud computing. Relevant coursework: Algorithms, Data Structures, Object-Oriented Design. Building full-stack applications with modern web technologies.",
      descriptionFr:
        "Concentration sur les systèmes distribués et le cloud computing. Cours pertinents : Algorithmes, Structures de données, Conception orientée objet. Construction d'applications full-stack avec des technologies web modernes.",
      tags: ["Algorithms", "Distributed Systems", "Web Development"],
      startDate: new Date("2024-09-01"),
      endDate: null, // Present
      order: 0,
    },
    {
      titleZh: "软件开发实习生",
      titleEn: "Software Development Intern",
      titleFr: "Stagiaire en développement logiciel",
      organization: "Tech Company",
      location: "San Francisco, CA",
      descriptionZh:
        "开发和维护公司前端的关键组件。与跨职能团队密切合作，包括开发人员、设计师和产品经理。倡导 Web 可访问性最佳实践。",
      descriptionEn:
        "Developed and maintained critical components for the company's frontend. Worked closely with cross-functional teams including developers, designers, and product managers. Advocated for web accessibility best practices.",
      descriptionFr:
        "Développement et maintenance de composants critiques pour le frontend de l'entreprise. Collaboration étroite avec des équipes interfonctionnelles comprenant des développeurs, des designers et des chefs de produit. Promotion des meilleures pratiques en matière d'accessibilité web.",
      tags: ["React", "TypeScript", "Node.js", "Accessibility"],
      startDate: new Date("2024-06-01"),
      endDate: new Date("2024-08-31"),
      order: 1,
    },
    {
      titleZh: "全栈开发项目",
      titleEn: "Full-Stack Development Project",
      titleFr: "Projet de développement full-stack",
      organization: "Personal Project",
      location: "Remote",
      descriptionZh:
        "构建了一个支持多语言的全栈博客平台，具有基于角色的访问控制。使用 Next.js、TypeScript、Prisma 和 PostgreSQL。实现了文章管理、用户认证和响应式设计。",
      descriptionEn:
        "Built a full-stack multilingual blog platform with role-based access control. Technologies: Next.js, TypeScript, Prisma, PostgreSQL. Implemented article management, user authentication, and responsive design.",
      descriptionFr:
        "Construction d'une plateforme de blog multilingue full-stack avec contrôle d'accès basé sur les rôles. Technologies : Next.js, TypeScript, Prisma, PostgreSQL. Mise en œuvre de la gestion des articles, de l'authentification des utilisateurs et du design réactif.",
      tags: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
      startDate: new Date("2024-10-01"),
      endDate: null, // Present
      order: 2,
    },
  ];

  for (const exp of experiences) {
    const created = await prisma.experience.create({
      data: exp,
    });
    console.log(`✅ 已创建: ${created.titleEn}`);
  }

  console.log("🎉 完成！已插入 3 条 Experience 数据");
}

main()
  .catch((e) => {
    console.error("❌ 错误:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
