import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/auth/AuthLayout';
import FormInput from '../../components/auth/FormInput';
import PasswordInput from '../../components/auth/PasswordInput';
import SocialLogin from '../../components/auth/SocialLogin';
import { useUserStore } from '../../store/userStore';
import { useAuth } from '../../hooks/useAuth';
import { config } from '../../config';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const setUser = useUserStore(state => state.setUser);
  const setToken = useUserStore(state => state.setToken);
  const { login } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted');
    
    setError(undefined);
    setIsLoading(true);

    try {
      console.log('Attempting login with:', { email });
      const response = await login(email, password);
      console.log('Login successful:', response);
      
      setUser(response.user);
      setToken(response.token);
      navigate('/home');
    } catch (err) {
      console.error('Login error:', err);
      setError('Email ou mot de passe incorrect');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError(undefined);
    setIsLoading(true);

    try {
      console.log('Redirecting to Google auth:', config.googleAuthUrl);
      window.location.href = config.googleAuthUrl;
    } catch (err) {
      console.error('Google login error:', err);
      setError('Une erreur est survenue lors de la connexion avec Google');
      setIsLoading(false);
    }
  };

  const validateEmail = (email: string) => {
    if (!email) return 'L\'email est requis';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return 'L\'email n\'est pas valide';
    }
    return undefined;
  };

  return (
    <AuthLayout 
      title="Connexion" 
      subtitle="Bienvenue sur Vestr"
    >
      <form 
        onSubmit={handleSubmit} 
        className="space-y-6"
        onTouchStart={() => console.log('Form touched')}
      >
        {error && (
          <div className="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-900/20 rounded-xl">
            {error}
          </div>
        )}

        <FormInput
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="vous@exemple.com"
          required
          autoComplete="email"
          validateOnBlur
          validate={validateEmail}
        />

        <PasswordInput
          label="Mot de passe"
          value={password}
          onChange={setPassword}
          required
          validateOnBlur
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-[#7257FF] focus:ring-[#7257FF]"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Se souvenir de moi
            </span>
          </label>

          <Link
            to="/auth/forgot-password"
            className="text-sm font-medium text-[#7257FF] hover:text-[#5B45CC]"
          >
            Mot de passe oublié ?
          </Link>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="button w-full justify-center bg-[#7257FF] hover:bg-[#5B45CC] text-white border-transparent"
          onTouchStart={() => console.log('Submit button touched')}
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            'Se connecter'
          )}
        </button>

        <SocialLogin
          onGoogleLogin={handleGoogleLogin}
          isLoading={isLoading}
        />

        <div className="text-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Pas encore de compte ?{' '}
            <Link
              to="/auth/signup"
              className="font-medium text-[#7257FF] hover:text-[#5B45CC]"
            >
              S'inscrire
            </Link>
          </span>
        </div>
      </form>
    </AuthLayout>
  );
};

export default LoginPage; 