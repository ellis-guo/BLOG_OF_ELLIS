import { getTranslations } from "@/i18n/i18n";
import type { Locale } from "@/i18n/i18n";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { CometCard } from "@/components/ui/comet-card";
import LifeMomentsSlider from "@/components/LifeMomentsSlider";
import Footer from "@/components/Footer";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const translations = await getTranslations(locale as Locale);
  const user = await currentUser();

  // Judge if user is admin
  const isAdmin = user?.username === "admin";

  // Get profile from database
  let profile = await prisma.profile.findFirst();

  // If no profile exists and user is admin, create an empty one
  if (!profile && isAdmin) {
    profile = await prisma.profile.create({
      data: {
        bioZh: "",
        bioEn: "",
        bioFr: "",
      },
    });
  }

  // Select bio based on locale
  const getBioByLocale = () => {
    if (!profile) return "";
    switch (locale) {
      case "zh":
        return profile.bioZh || "";
      case "fr":
        return profile.bioFr || "";
      default:
        return profile.bioEn || "";
    }
  };

  const bio = getBioByLocale();

  // Contact info array for rendering
  const contactInfo = [
    {
      icon: "📧",
      label: "Email",
      value: profile?.email,
      link: profile?.email ? `mailto:${profile.email}` : null,
    },
    {
      icon: "💻",
      label: "GitHub",
      value: profile?.github,
      link: profile?.github ? `https://github.com/${profile.github}` : null,
    },
    {
      icon: "💼",
      label: "LinkedIn",
      value: profile?.linkedin,
      link: profile?.linkedin
        ? `https://linkedin.com/in/${profile.linkedin}`
        : null,
    },
    {
      icon: "🐦",
      label: "Twitter",
      value: profile?.twitter,
      link: profile?.twitter ? `https://twitter.com/${profile.twitter}` : null,
    },
    { icon: "💬", label: "WeChat", value: profile?.wechat, link: null },
  ].filter((item) => item.value);

  const lifeMoments = await prisma.lifeMoment.findMany({
    orderBy: {
      order: "asc",
    },
  });

  return (
    <div className="max-w-[1024px] mx-auto">
      {/* Main content area - two column layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
        {/* Left side: Photo area */}
        <div className="flex justify-center items-start">
          <CometCard>
            <div
              className="flex w-80 cursor-pointer flex-col items-stretch rounded-[16px] border-2 border-black bg-black p-2"
              style={{
                transformStyle: "preserve-3d",
                transform: "none",
                opacity: 1,
              }}
            >
              <div className="flex-1">
                <div className="relative aspect-[3/4] w-full">
                  <img
                    loading="lazy"
                    className="absolute inset-0 h-full w-full rounded-[14px] object-cover"
                    alt="Profile photo"
                    src={
                      profile?.photoUrl ||
                      "https://images.unsplash.com/photo-1505506874110-6a7a69069a08?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    }
                    style={{
                      boxShadow: "rgba(0, 0, 0, 0.05) 0px 5px 6px 0px",
                      opacity: 1,
                    }}
                  />
                </div>
              </div>
            </div>
          </CometCard>
        </div>

        {/* Right side: Personal information */}
        <div className="space-y-8">
          {/* Bio section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">{translations.about.bio}</h2>

            {bio ? (
              <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {bio}
              </div>
            ) : (
              <p className="text-gray-400 italic">
                {translations.about.noBio}
                {isAdmin && (
                  <span className="block mt-2 text-sm">
                    {translations.about.clickToAdd}
                  </span>
                )}
              </p>
            )}
          </div>

          {/* Contact section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">{translations.about.contact}</h2>

            {contactInfo.length > 0 ? (
              <div className="space-y-2">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span>{item.icon}</span>
                    <span className="font-semibold">{item.label}:</span>
                    {item.link ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[#F35029] transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span>{item.value}</span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 italic">
                {translations.about.noContact}
                {isAdmin && (
                  <span className="block mt-2 text-sm">
                    {translations.about.clickToAdd}
                  </span>
                )}
              </p>
            )}
          </div>

          {/* Admin edit button */}
          {isAdmin && (
            <div className="pt-6">
              <Link
                href={`/${locale}/admin/profile/edit`}
                className="inline-block px-6 py-3 border-2 border-black bg-white hover:bg-[#F35029] hover:!text-white hover:border-[#F35029] transition-all font-semibold"
              >
                {translations.about.editProfile}
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Life Moments area */}
      <div className="py-8 border-t border-[#ccc]">
        <h2 className="text-2xl mb-6 font-bold">
          {translations.about.lifeMoments}
        </h2>
        <LifeMomentsSlider
          moments={lifeMoments}
          isAdmin={isAdmin}
          locale={locale}
        />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
