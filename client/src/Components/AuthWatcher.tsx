import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function AuthWatcher() {
  const { data, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthRequired = !['/login', '/signup'].includes(location.pathname);

  useEffect(() => {
    if (!isLoading && !data && isAuthRequired) {
      navigate('/login');
    }
  }, [data, isLoading, isAuthRequired, navigate]);

  return null;
}
