export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <nav className="border-b p-4">
        <div>navbar</div>
      </nav>
      <main className="p-8">{children}</main>
    </div>
  );
}
