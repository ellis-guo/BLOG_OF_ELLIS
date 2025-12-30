import { getTranslations } from "@/i18n/i18n";
import type { Locale } from "@/i18n/i18n";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import ArticleItem from "@/components/ArticleItem";
import Footer from "@/components/Footer";
import { Visibility } from "@prisma/client";
import Navbar from "@/components/Navbar";

export default async function PostsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const translations = await getTranslations(locale as Locale);

  // Get current user to determine permissions
  const user = await currentUser();
  const isAdmin = user?.username === "admin";
  const isGuest = !!user && !isAdmin;

  // Build query based on user permissions
  let whereClause: {
    type: string;
    visibility?:
      | Visibility
      | {
          in: Visibility[];
        };
  };

  if (isAdmin) {
    // Admin sees everything
    whereClause = { type: "project" };
  } else if (isGuest) {
    // Guest sees public + guest
    whereClause = {
      type: "project",
      visibility: { in: [Visibility.public, Visibility.guest] },
    };
  } else {
    // Visitor sees only public
    whereClause = {
      type: "project",
      visibility: Visibility.public,
    };
  }

  // Fetch posts from database
  const posts = await prisma.article.findMany({
    where: whereClause,
    orderBy: {
      createdAt: "desc",
    },
  });

  // Helper function to get title by locale
  const getTitle = (article: any) => {
    switch (locale) {
      case "zh":
        return article.titleZh;
      case "fr":
        return article.titleFr;
      default:
        return article.titleEn;
    }
  };

  // Helper function to get description by locale
  const getDescription = (article: any) => {
    let description;
    switch (locale) {
      case "zh":
        description = article.descriptionZh;
        break;
      case "fr":
        description = article.descriptionFr;
        break;
      default:
        description = article.descriptionEn;
    }

    // Fallback: if no custom description, generate from content
    if (!description) {
      let content;
      switch (locale) {
        case "zh":
          content = article.contentZh;
          break;
        case "fr":
          content = article.contentFr;
          break;
        default:
          content = article.contentEn;
      }
      // Remove markdown syntax and take first 150 chars
      const plainText = content
        .replace(/[#*`_\[\]]/g, "") // Remove markdown symbols
        .replace(/\n/g, " ") // Replace line breaks with space
        .trim();
      description =
        plainText.slice(0, 150) + (plainText.length > 150 ? "..." : "");
    }

    return description;
  };

  // Helper function to format date by locale
  const formatDate = (date: Date) => {
    const dateObj = new Date(date);
    switch (locale) {
      case "zh":
        return dateObj.toLocaleDateString("zh-CN", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      case "fr":
        return dateObj.toLocaleDateString("fr-FR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      default:
        return dateObj.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
    }
  };

  // Helper function to get category label by locale
  const getCategoryLabel = () => {
    switch (locale) {
      case "zh":
        return "随笔";
      case "fr":
        return "Billet";
      default:
        return "Post";
    }
  };

  return (
    <>
      <Navbar locale={locale} translations={translations} />
      <div className="max-w-[1024px] mx-auto">
        {/* Page Title */}
        <h1 className="text-4xl mb-8">{translations.nav.blog}</h1>

        {/* Posts List */}
        {posts.length === 0 ? (
          <div className="text-center py-12 text-gray-400 italic">
            {locale === "zh" && "暂无随笔..."}
            {locale === "fr" && "Pas encore de billets..."}
            {locale === "en" && "No posts yet..."}
          </div>
        ) : (
          <div className="max-w-[800px]">
            {posts.map((post) => (
              <ArticleItem
                key={post.id}
                id={post.id}
                title={getTitle(post)}
                date={formatDate(post.createdAt)}
                category={getCategoryLabel()}
                description={getDescription(post)}
                href={`/${locale}/articles/${post.slug}`}
                isAdmin={isAdmin}
                locale={locale}
              />
            ))}
          </div>
        )}

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
