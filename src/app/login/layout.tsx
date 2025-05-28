export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex w-full justify-start items-start min-h-screen">
      {children}
    </main>
  );
}
