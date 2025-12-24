import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import prisma from "@/lib/prisma";
import type { Locale } from "@/i18n/i18n";

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  // Fetch article from database
  const article = await prisma.article.findUnique({
    where: { slug },
  });

  // Show 404 if article not found
  if (!article) {
    notFound();
  }

  // Select content based on locale
  const getContentByLocale = () => {
    switch (locale) {
      case "zh":
        return {
          title: article.titleZh,
          content: article.contentZh,
        };
      case "fr":
        return {
          title: article.titleFr,
          content: article.contentFr,
        };
      default:
        return {
          title: article.titleEn,
          content: article.contentEn,
        };
    }
  };

  const { title, content } = getContentByLocale();

  // Format date based on locale
  const formatDate = (date: Date) => {
    const localeMap: Record<string, string> = {
      zh: "zh-CN",
      en: "en-US",
      fr: "fr-FR",
    };

    return new Date(date).toLocaleDateString(localeMap[locale] || "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Determine back button link based on article type
  const backLink =
    article.type === "project" ? `/${locale}/projects` : `/${locale}/blog`;

  const backText =
    article.type === "project" ? "← Back to Projects" : "← Back to Blog";

  return (
    <div className="max-w-[800px] mx-auto">
      {/* Back button */}
      <div className="mb-8">
        <Link
          href={backLink}
          className="text-base hover:text-[#F35029] transition-colors"
        >
          {backText}
        </Link>
      </div>

      {/* Article title */}
      <h1 className="text-4xl mb-6">{title}</h1>

      {/* Metadata: publish date, update date, author */}
      <div className="text-sm text-[#999] space-y-1 mb-8 pb-6 border-b border-[#ccc]">
        <div>📅 Published: {formatDate(article.createdAt)}</div>
        <div>🔄 Updated: {formatDate(article.updatedAt)}</div>
        <div>✍️ Author: {article.author}</div>
      </div>

      {/* Markdown content */}
      <div className="markdown-content">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </div>
    </div>
  );
}
