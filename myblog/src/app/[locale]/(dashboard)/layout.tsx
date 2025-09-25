import Navbar from "@/components/Navbar";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <div className="min-h-screen">
      <Navbar locale={locale} />
      <main className="max-w-6xl mx-auto px-4 py-12">{children}</main>
    </div>
  );
}
