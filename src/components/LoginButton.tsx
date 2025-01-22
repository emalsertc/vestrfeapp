import React, { useState } from 'react';
import { Button } from 'konsta/react';
import { useAuth } from '../hooks/useAuth';

export const LoginButton: React.FC = () => {
  const { isAuthenticated, login, logout } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    try {
      setError(null);
      if (isAuthenticated) {
        await logout();
      } else {
        window.location.href = '/auth/login';
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  return (
    <Button
      onClick={handleClick}
      className={isAuthenticated ? 'bg-red-500 text-white' : ''}
    >
      {isAuthenticated ? 'Se déconnecter' : 'Se connecter'}
    </Button>
  );
}; 