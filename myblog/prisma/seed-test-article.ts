import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting to seed test article...");

  // Delete existing test article if exists
  await prisma.article.deleteMany({
    where: { slug: "test-project" },
  });

  // Chinese content
  const contentZh = `# 个人博客重建项目

这是我使用 Next.js 15 重建的个人博客网站，这个项目让我深入学习了现代全栈开发技术。

## 项目背景

在学习 Web 开发的过程中，我意识到需要一个**真实的项目**来实践所学知识。于是决定从零开始构建一个完整的博客系统。

### 为什么选择 Next.js？

Next.js 提供了以下优势：

- 服务端渲染（SSR）和静态生成（SSG）
- 文件系统路由，简化开发流程
- 内置 API Routes，无需单独后端
- 优秀的性能优化
- 强大的社区支持

> "选择正确的工具，事半功倍。" —— 某位智者

## 技术栈

### 前端技术

| 技术 | 用途 | 版本 |
|------|------|------|
| Next.js | 框架 | 15.5.9 |
| TypeScript | 类型系统 | 5.x |
| Tailwind CSS | 样式 | 4.x |
| Framer Motion | 动画 | 12.x |

### 后端技术

1. **Prisma ORM** - 数据库操作
2. **PostgreSQL** - 数据存储
3. **Clerk** - 用户认证
4. **Cloudinary** - 图片托管

## 核心功能

### 1. 多语言支持

网站支持三种语言：

- 🇨🇳 简体中文
- 🇬🇧 英语
- 🇫🇷 法语

实现方式是通过 Next.js 的动态路由 \`[locale]\` 实现。

### 2. Markdown 编辑器

使用 \`react-markdown\` 渲染内容，支持：

- **粗体**和*斜体*
- ~~删除线~~
- \`行内代码\`
- 代码块

#### 代码示例

这是一个简单的 React 组件：

\`\`\`tsx
import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
\`\`\`

### 3. 响应式设计

网站在各种设备上都能良好显示：

- 📱 手机（< 640px）
- 📱 平板（640px - 1024px）  
- 💻 桌面（> 1024px）

## 开发过程中的挑战

### Challenge 1: 数据库设计

最初的设计过于复杂，后来简化为：

\`\`\`sql
-- 简化后的 Post 模型
CREATE TABLE Article (
  id TEXT PRIMARY KEY,
  type TEXT DEFAULT 'post',
  slug TEXT UNIQUE,
  title_zh TEXT,
  content_zh TEXT
);
\`\`\`

### Challenge 2: 性能优化

遇到的问题：
1. 图片加载慢
2. 首屏渲染时间长
3. Docker 网络开销大

解决方案：
- [ ] 使用 Next.js Image 组件
- [x] 添加数据库连接池
- [ ] CDN 加速静态资源

## 项目链接

- 📦 **GitHub**: [github.com/ellisguo/myblog](https://github.com)
- 🌐 **在线演示**: [ellisguo.com](https://ellisguo.com)
- 📝 **文档**: [Read the docs](https://docs.com)

---

## 学到的经验

通过这个项目，我学到了：

1. **全栈开发**不只是前端 + 后端，还包括：
   - 数据库设计
   - 部署运维
   - 性能优化
   - 安全防护

2. **从用户角度思考**：
   > 技术再酷炫，如果用户体验不好，也是失败的产品。

3. **持续学习的重要性**：
   - 每天都有新技术出现
   - 保持好奇心和学习热情
   - 实践是最好的老师

## 未来计划

### 短期目标（1-3个月）

- [ ] 添加评论系统
- [ ] 集成全文搜索
- [ ] 添加 RSS 订阅
- [ ] 暗黑模式支持

### 长期目标（3-6个月）

- [ ] 添加数据分析
- [ ] SEO 深度优化
- [ ] 多作者支持
- [ ] API 文档生成

---

## 致谢

感谢以下资源和工具：

- [Next.js 文档](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Vercel 社区](https://vercel.com)

**特别感谢 Claude AI 在开发过程中的帮助！** 🎉

---

> 这只是开始，未来还有更多可能性等待探索。

*最后更新：2024年12月*`;

  // English content
  const contentEn = `# Personal Blog Rebuild Project

This is my personal blog website rebuilt using Next.js 15, allowing me to deeply explore modern full-stack development technologies.

## Project Background

While learning web development, I realized I needed a **real project** to practice what I learned. So I decided to build a complete blog system from scratch.

### Why Next.js?

Next.js provides the following advantages:

- Server-Side Rendering (SSR) and Static Site Generation (SSG)
- File-based routing for simplified development
- Built-in API Routes without separate backend
- Excellent performance optimization
- Strong community support

> "Choose the right tool, work smarter not harder." — Some wise person

## Tech Stack

### Frontend Technologies

| Technology | Purpose | Version |
|------------|---------|---------|
| Next.js | Framework | 15.5.9 |
| TypeScript | Type System | 5.x |
| Tailwind CSS | Styling | 4.x |
| Framer Motion | Animation | 12.x |

## Core Features

### 1. Multilingual Support

The website supports three languages: Chinese, English, and French.

### 2. Markdown Editor

Using \`react-markdown\` for content rendering, supporting **bold**, *italic*, and \`code\`.

#### Code Example

\`\`\`tsx
import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}
\`\`\`

## Lessons Learned

Through this project, I learned the importance of:
- Database design
- Performance optimization
- Continuous learning

**Special thanks to Claude AI!** 🎉`;

  // French content
  const contentFr = `# Projet de reconstruction du blog personnel

Ceci est mon site web de blog personnel reconstruit avec Next.js 15.

## Contexte du projet

En apprenant le développement web, j'ai réalisé que j'avais besoin d'un **projet réel** pour pratiquer.

### Pourquoi Next.js ?

Next.js offre les avantages suivants :

- Rendu côté serveur (SSR)
- Routage basé sur les fichiers
- Excellente optimisation des performances

> "Choisissez le bon outil, travaillez plus intelligemment." — Une personne sage

## Stack technique

| Technologie | Usage | Version |
|-------------|-------|---------|
| Next.js | Framework | 15.5.9 |
| TypeScript | Système de types | 5.x |

## Fonctionnalités principales

Le site web supporte trois langues et utilise \`react-markdown\`.

\`\`\`tsx
export default function Counter() {
  const [count, setCount] = useState(0);
  return <button>Compteur : {count}</button>;
}
\`\`\`

**Remerciements spéciaux à Claude AI !** 🎉`;

  // Create test article
  const article = await prisma.article.create({
    data: {
      slug: "test-project",
      type: "project",
      titleZh: "测试项目",
      titleEn: "Test Project",
      titleFr: "Projet de test",
      contentZh,
      contentEn,
      contentFr,
      author: "郭世越 Ellis Guo",
      visibility: "public",
    },
  });

  console.log("✅ Created test article:", article.slug);
  console.log("\n📍 Visit:");
  console.log("   中文: http://localhost:3000/zh/articles/test-project");
  console.log("   English: http://localhost:3000/en/articles/test-project");
  console.log("   Français: http://localhost:3000/fr/articles/test-project");
}

main()
  .catch((e) => {
    console.error("❌ Error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
