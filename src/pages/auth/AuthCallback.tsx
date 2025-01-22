import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../store/userStore';
import { authService } from '../../services/AuthService';

const AuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const setUser = useUserStore(state => state.setUser);
  const setToken = useUserStore(state => state.setToken);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Récupérer les paramètres de l'URL
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        const userStr = urlParams.get('user');

        if (!token || !userStr) {
          throw new Error('Token ou informations utilisateur manquants');
        }

        // Parser les informations utilisateur
        const user = JSON.parse(decodeURIComponent(userStr));

        // Mettre à jour le store
        setToken(token);
        setUser({
          id: user.id,
          name: user.name,
          email: user.email,
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

        // Rediriger vers la page d'accueil
        navigate('/home');
      } catch (error) {
        console.error('Erreur lors du traitement du callback:', error);
        navigate('/auth/login');
      }
    };

    handleCallback();
  }, [navigate, setToken, setUser]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-5 h-5 border-2 border-[#7257FF] border-t-transparent rounded-full animate-spin" />
    </div>
  );
};

export default AuthCallback; 