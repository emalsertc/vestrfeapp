import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/AuthService';
import { useUserStore } from '../store/userStore';

export const AuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const setUser = useUserStore(state => state.setUser);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');

        if (!token) {
          throw new Error('No token provided');
        }

        const response = await authService.googleAuth(token);
        setUser({
          id: response.user.id,
          name: response.user.name,
          email: response.user.email,
          friendsCount: 0,
          sponsorships: {
            active: [],
            pending: [],
            maxCount: 4
          },
          subscription: {
            status: 'pending',
            monthlyPayment: 0
          }
        });
        navigate('/home');
      } catch (error) {
        console.error('Auth callback error:', error);
        navigate('/auth/login');
      }
    };

    handleCallback();
  }, [navigate, setUser]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#7257FF] border-t-transparent"></div>
    </div>
  );
}; 