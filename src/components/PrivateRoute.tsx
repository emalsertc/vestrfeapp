import React, { useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface PrivateRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ 
  children, 
  requireAuth = true 
}) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (requireAuth && !isAuthenticated) {
      navigate('/login', { replace: true });
    } else if (!requireAuth && isAuthenticated) {
      navigate('/home', { replace: true });
    }
  }, [isAuthenticated, requireAuth, navigate]);

  // Retourner null pendant la redirection pour éviter le flash de contenu
  if (requireAuth && !isAuthenticated) {
    return null;
  }

  if (!requireAuth && isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}; 