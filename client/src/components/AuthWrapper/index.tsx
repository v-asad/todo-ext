'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState, PropsWithChildren } from 'react';
import Loader from '../Loader';
import { verifyToken } from '@/services/userService';

const AuthWrapper = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isChecking, setIsChecking] = useState<boolean>(true);

  useEffect(() => {
    const checkAuth = async () => {
      const isValid = await verifyToken();
      if (!isValid) {
        router.push('/login');
      } else {
        setIsAuthenticated(true);
      }
      setIsChecking(false);
    };

    checkAuth();
  }, [router]);

  if (isChecking) return <Loader />;
  if (!isAuthenticated) return null;

  return <>{children}</>;
};

export default AuthWrapper;
