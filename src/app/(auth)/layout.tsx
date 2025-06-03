export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full flex justify-start items-center">
      <main className="flex w-full justify-center items-start">{children}</main>
    </div>
  );
}
