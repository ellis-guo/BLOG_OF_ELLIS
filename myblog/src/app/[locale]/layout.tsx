export function generateStaticParams() {
  return [{ locale: "zh" }, { locale: "en" }, { locale: "fr" }];
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return <>{children}</>;
}
