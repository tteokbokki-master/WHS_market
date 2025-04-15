import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const { data, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !data) {
      navigate('/login');
    }
  }, [data, isLoading, navigate]);

  if (isLoading) return null;

  return <>{children}</>;
}
