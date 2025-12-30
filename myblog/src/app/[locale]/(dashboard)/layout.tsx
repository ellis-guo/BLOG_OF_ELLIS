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

  return <>{children}</>;
}
