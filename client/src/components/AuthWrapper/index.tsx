'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState, PropsWithChildren } from 'react';
import Loader from '../Loader';

const AuthWrapper = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return <Loader />;
};

export default AuthWrapper;
