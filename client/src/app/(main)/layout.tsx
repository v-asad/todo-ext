import AuthWrapper from '@/components/AuthWrapper';
import Sidebar from '@/components/Sidebar/Sidebar';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthWrapper>
      <div className="w-full flex justify-start items-center">
        <Sidebar />
        <main className="flex w-full justify-center items-start">{children}</main>
      </div>
    </AuthWrapper>
  );
}
