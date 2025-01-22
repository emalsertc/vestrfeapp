import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/userStore';
import { useAuth } from '../hooks/useAuth';
import { config } from '../config';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();
  const setUser = useUserStore((state) => state.setUser);
  const setToken = useUserStore((state) => state.setToken);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt with:', { email }); // Debug log
    
    try {
      setError('');
      setLoading(true);
      console.log('Calling login API...'); // Debug log
      
      const { user, token } = await login(email, password);
      console.log('Login response received:', { user }); // Debug log
      
      setUser(user);
      setToken(token);
      navigate('/');
    } catch (error) {
      console.error('Login error:', error); // Debug log
      setError(error instanceof Error ? error.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    console.log('Redirecting to Google auth:', config.googleAuthUrl); // Debug log
    window.location.href = config.googleAuthUrl;
  };

  // ... rest of the component code ...
} 