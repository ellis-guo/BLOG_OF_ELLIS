import Navbar from "@/components/Navbar";
import { getTranslations } from "@/i18n/i18n";
import type { Locale } from "@/i18n/i18n";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const translations = await getTranslations(locale as Locale);

  return (
    <div className="min-h-screen">
      <Navbar locale={locale} translations={translations} />
      <main className="max-w-[1024px] mx-auto px-5 py-12">{children}</main>
    </div>
  );
}
