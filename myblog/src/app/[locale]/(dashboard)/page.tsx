import SidebarNav from "@/components/SidebarNav";
import ViewAllButton from "@/components/ViewAllButton";
import HomepageExperienceItem from "@/components/HomepageExperienceItem";
import HomepageArticleItem from "@/components/HomepageArticleItem";
import Navbar from "@/components/Navbar";
import { getTranslations } from "@/i18n/i18n";
import type { Locale } from "@/i18n/i18n";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const translations = await getTranslations(locale as Locale);
  const user = await currentUser();
  const isAdmin = user?.username === "admin";

  // Fetch homepage data
  const homepage = await prisma.homepage.findFirst();

  // Get content based on locale
  const slogan =
    locale === "zh"
      ? homepage?.sloganZh
      : locale === "fr"
      ? homepage?.sloganFr
      : homepage?.sloganEn;

  const about =
    locale === "zh"
      ? homepage?.aboutZh
      : locale === "fr"
      ? homepage?.aboutFr
      : homepage?.aboutEn;

  // Fetch featured experiences
  const experiences = homepage?.featuredExperienceIds?.length
    ? await prisma.experience.findMany({
        where: { id: { in: homepage.featuredExperienceIds } },
        orderBy: { startDate: "desc" },
      })
    : [];

  // Fetch featured projects
  const projects = homepage?.featuredProjectIds?.length
    ? await prisma.article.findMany({
        where: { id: { in: homepage.featuredProjectIds } },
      })
    : [];

  // Fetch featured posts
  const posts = homepage?.featuredPostIds?.length
    ? await prisma.article.findMany({
        where: { id: { in: homepage.featuredPostIds } },
      })
    : [];

  // Helper functions
  const getTitle = (item: any) => {
    switch (locale) {
      case "zh":
        return item.titleZh;
      case "fr":
        return item.titleFr;
      default:
        return item.titleEn;
    }
  };

  const getDescription = (item: any) => {
    switch (locale) {
      case "zh":
        return item.descriptionZh;
      case "fr":
        return item.descriptionFr;
      default:
        return item.descriptionEn;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Top bar: Language + User button */}
      <Navbar locale={locale} translations={translations} />

      {/* Centered container with max-width */}
      <div className="max-w-[1280px] mx-auto">
        {/* Main layout: Sidebar + Content */}
        <div className="flex flex-col lg:flex-row">
          {/* Left sidebar: Fixed navigation */}
          <SidebarNav />

          {/* Right content area: Scrollable */}
          <main className="w-full lg:w-[52%] px-6 lg:px-24 py-12 lg:py-24">
            {/* About Section */}
            <section
              id="about"
              className="min-h-screen mb-36 scroll-mt-16 lg:scroll-mt-24"
            >
              <h2 className="text-4xl lg:text-5xl font-bold mb-8">About</h2>

              {/* Slogan */}
              {slogan && (
                <p className="text-xl font-semibold mb-8 text-gray-800">
                  {slogan}
                </p>
              )}

              {/* About content */}
              {about ? (
                <div className="space-y-4 text-base text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {about}
                </div>
              ) : (
                <div className="text-gray-400 italic">
                  No content yet.
                  {isAdmin && " Click Edit Homepage to add content."}
                </div>
              )}

              <div className="mt-12 flex gap-4">
                <ViewAllButton
                  href={`/${locale}/about`}
                  text="View Full Profile"
                />
                {isAdmin && (
                  <Link
                    href={`/${locale}/admin/homepage/edit`}
                    className="inline-flex items-center gap-2 text-[#F35029] hover:text-black transition-colors font-semibold text-sm hover:no-underline"
                  >
                    Edit Homepage
                  </Link>
                )}
              </div>
            </section>

            {/* Experience Section */}
            <section
              id="experience"
              className="min-h-screen mb-36 scroll-mt-16 lg:scroll-mt-24"
            >
              <h2 className="text-4xl lg:text-5xl font-bold mb-8">
                Experience
              </h2>

              {experiences.length === 0 ? (
                <div className="text-gray-400 italic">
                  No experiences yet.
                  {isAdmin && " Add some in Edit Homepage."}
                </div>
              ) : (
                <div className="space-y-12">
                  {experiences.map((exp) => (
                    <HomepageExperienceItem
                      key={exp.id}
                      title={getTitle(exp)}
                      organization={exp.organization}
                      location={exp.location || undefined}
                      description={getDescription(exp)}
                      tags={exp.tags}
                      startDate={exp.startDate}
                      endDate={exp.endDate}
                    />
                  ))}
                </div>
              )}

              <div className="mt-12">
                <ViewAllButton
                  href={`/${locale}/about`}
                  text="View Full Profile"
                />
              </div>
            </section>

            {/* Projects Section */}
            <section
              id="projects"
              className="min-h-screen mb-36 scroll-mt-16 lg:scroll-mt-24"
            >
              <h2 className="text-4xl lg:text-5xl font-bold mb-8">
                Featured Projects
              </h2>

              {projects.length === 0 ? (
                <div className="text-gray-400 italic">
                  No projects yet.
                  {isAdmin && " Add some in Edit Homepage."}
                </div>
              ) : (
                <div className="space-y-8">
                  {projects.map((project) => (
                    <HomepageArticleItem
                      key={project.id}
                      title={getTitle(project)}
                      date={project.createdAt}
                      description={getDescription(project)}
                      tags={project.tags}
                      href={`/${locale}/articles/${project.slug}`}
                    />
                  ))}
                </div>
              )}

              <div className="mt-12">
                <ViewAllButton
                  href={`/${locale}/projects`}
                  text="View Full Project Archive"
                />
              </div>
            </section>

            {/* Posts Section */}
            <section
              id="posts"
              className="min-h-screen mb-36 scroll-mt-16 lg:scroll-mt-24"
            >
              <h2 className="text-4xl lg:text-5xl font-bold mb-8">
                Latest Writing
              </h2>

              {posts.length === 0 ? (
                <div className="text-gray-400 italic">
                  No posts yet.
                  {isAdmin && " Add some in Edit Homepage."}
                </div>
              ) : (
                <div className="space-y-8">
                  {posts.map((post) => (
                    <HomepageArticleItem
                      key={post.id}
                      title={getTitle(post)}
                      date={post.createdAt}
                      description={getDescription(post)}
                      tags={post.tags}
                      href={`/${locale}/articles/${post.slug}`}
                    />
                  ))}
                </div>
              )}

              <div className="mt-12">
                <ViewAllButton
                  href={`/${locale}/posts`}
                  text="View All Posts"
                />
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
