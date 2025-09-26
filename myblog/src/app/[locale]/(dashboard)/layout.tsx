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
  // Get locale from params
  const { locale } = await params;

  // Load translations for current locale
  const translations = await getTranslations(locale as Locale);

  return (
    <div className="min-h-screen">
      <Navbar locale={locale} translations={translations} />
      <main className="max-w-6xl mx-auto px-4 py-12">{children}</main>
    </div>
  );
}
