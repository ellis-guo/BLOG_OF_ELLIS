// 这是用来预览 ArticleItem 组件的测试页面
// 保存到: src/app/[locale]/(dashboard)/preview/page.tsx

import ArticleItem from "@/components/ArticleItem";

export default function PreviewPage() {
  // 假数据用于预览
  const articles = [
    {
      title: "如何使用 Next.js 构建现代化博客",
      date: "2024年10月14日",
      category: "技术博客",
      description:
        "本文介绍了使用 Next.js 15、Prisma 和 PostgreSQL 构建全栈博客系统的完整流程，包括多语言支持、用户认证等功能。",
      href: "/zh/blog/nextjs-blog-guide",
    },
    {
      title: "TypeScript 最佳实践",
      date: "2024年10月10日",
      category: "技术博客",
      description:
        "分享在实际项目中使用 TypeScript 的经验和技巧，包括类型定义、泛型使用、以及常见陷阱的避免方法。",
      href: "/zh/blog/typescript-best-practices",
    },
    {
      title: "个人博客网站重建项目",
      date: "2024年10月1日",
      category: "项目",
      description:
        "使用 Next.js 15 + Prisma + Clerk 构建的个人博客系统，支持中英法三语，包含文章管理、项目展示等功能。",
      href: "/zh/projects/blog-rebuild",
    },
    {
      title: "React 性能优化指南",
      date: "2024年9月28日",
      category: "技术博客",
      href: "/zh/blog/react-performance",
    },
  ];

  return (
    <div>
      <h1 className="text-4xl mb-8">文章列表预览</h1>

      <div className="max-w-[800px]">
        {articles.map((article, index) => (
          <ArticleItem
            key={index}
            title={article.title}
            date={article.date}
            category={article.category}
            description={article.description}
            href={article.href}
          />
        ))}
      </div>
    </div>
  );
}
