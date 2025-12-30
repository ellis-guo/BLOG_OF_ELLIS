import SidebarNav from "@/components/SidebarNav";
import ViewAllButton from "@/components/ViewAllButton";
import Navbar from "@/components/Navbar";
import { getTranslations } from "@/i18n/i18n";
import type { Locale } from "@/i18n/i18n";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const translations = await getTranslations(locale as Locale);

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
              <div className="space-y-4 text-base text-gray-700 leading-relaxed">
                <p>
                  I'm a full-stack developer passionate about building modern
                  web applications that combine elegant design with robust
                  engineering. My favorite work lies at the intersection of
                  frontend and backend, creating experiences that are both
                  beautiful and performant.
                </p>
                <p>
                  Currently, I'm a Computer Science graduate student at
                  Northeastern University in the ALIGN program, focusing on
                  distributed systems and cloud computing. I'm exploring AI
                  technologies and building projects that showcase full-stack
                  development skills.
                </p>
                <p>
                  In my free time, I enjoy learning new technologies,
                  contributing to open source projects, and sharing knowledge
                  through technical writing.
                </p>
              </div>

              <div className="mt-12">
                <ViewAllButton
                  href={`/${locale}/about`}
                  text="View Full Profile"
                />
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
              <div className="space-y-12">
                <div>
                  <div className="text-sm text-gray-500 mb-1">
                    2024 — Present
                  </div>
                  <h3 className="text-2xl font-bold mb-2">
                    Northeastern University
                  </h3>
                  <p className="text-base text-gray-600 mb-3">
                    Master of Science in Computer Science - ALIGN Program
                  </p>
                  <p className="text-base text-gray-700 leading-relaxed">
                    Relevant coursework: Algorithms, Data Structures,
                    Object-Oriented Design. Building full-stack applications
                    with modern web technologies.
                  </p>
                </div>
              </div>

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
              <div className="space-y-16">
                <div>
                  <h3 className="text-2xl font-bold mb-3">
                    Personal Blog Website
                  </h3>
                  <p className="text-base text-gray-700 leading-relaxed mb-4">
                    A full-stack multilingual blog platform with role-based
                    access control, featuring Chinese, English, and French
                    content management. Built with modern technologies and clean
                    architecture.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded">
                      Next.js
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded">
                      TypeScript
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded">
                      Prisma
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded">
                      PostgreSQL
                    </span>
                  </div>
                </div>
              </div>

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
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold mb-1 hover:text-[#F35029] transition-colors">
                    Sample Article Title
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">December 2024</p>
                  <p className="text-base text-gray-700">
                    Brief description or excerpt of the article...
                  </p>
                </div>
              </div>

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
