import AuthWrapper from '@/components/AuthWrapper';
import Sidebar from '@/components/Sidebar';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full flex justify-start items-center">
      <AuthWrapper>
        <Sidebar />
        <main className="flex w-full justify-center items-start">{children}</main>
      </AuthWrapper>
    </div>
  );
}
