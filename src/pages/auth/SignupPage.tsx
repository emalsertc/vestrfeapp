import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/auth/AuthLayout';
import FormInput from '../../components/auth/FormInput';
import PasswordInput from '../../components/auth/PasswordInput';
import SocialLogin from '../../components/auth/SocialLogin';
import { useUserStore } from '../../store/userStore';
import { useAuth } from '../../hooks/useAuth';
import { config } from '../../config';

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const setUser = useUserStore(state => state.setUser);
  const setToken = useUserStore(state => state.setToken);
  const { register } = useAuth();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(undefined);

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    setIsLoading(true);

    try {
      const response = await register(name, email, password, confirmPassword);
      setUser(response.user);
      setToken(response.token);
      navigate('/home');
    } catch (err) {
      setError('Une erreur est survenue lors de l\'inscription');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError(undefined);
    setIsLoading(true);

    try {
      window.location.href = config.googleAuthUrl;
    } catch (err) {
      setError('Une erreur est survenue lors de la connexion avec Google');
      setIsLoading(false);
    }
  };

  const validateName = (name: string) => {
    if (!name) return 'Le nom est requis';
    if (name.length < 2) return 'Le nom doit contenir au moins 2 caractères';
    return undefined;
  };

  const validateEmail = (email: string) => {
    if (!email) return 'L\'email est requis';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return 'L\'email n\'est pas valide';
    }
    return undefined;
  };

  const validatePassword = (password: string) => {
    if (!password) return 'Le mot de passe est requis';
    if (password.length < 8) {
      return 'Le mot de passe doit contenir au moins 8 caractères';
    }
    return undefined;
  };

  return (
    <AuthLayout 
      title="Inscription" 
      subtitle="Créez votre compte Vestr"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-900/20 rounded-xl">
            {error}
          </div>
        )}

        <FormInput
          label="Nom"
          type="text"
          value={name}
          onChange={setName}
          placeholder="John Doe"
          required
          autoComplete="name"
          validateOnBlur
          validate={validateName}
        />

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
          validate={validatePassword}
        />

        <PasswordInput
          label="Confirmer le mot de passe"
          value={confirmPassword}
          onChange={setConfirmPassword}
          required
          validateOnBlur
          validate={(value) => {
            if (!value) return 'La confirmation du mot de passe est requise';
            if (value !== password) return 'Les mots de passe ne correspondent pas';
            return undefined;
          }}
        />

        <button
          type="submit"
          disabled={isLoading}
          className="button w-full justify-center bg-[#7257FF] hover:bg-[#5B45CC] text-white border-transparent"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            'S\'inscrire'
          )}
        </button>

        <SocialLogin
          onGoogleLogin={handleGoogleLogin}
          isLoading={isLoading}
        />

        <div className="text-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Déjà un compte ?{' '}
            <Link
              to="/auth/login"
              className="font-medium text-[#7257FF] hover:text-[#5B45CC]"
            >
              Se connecter
            </Link>
          </span>
        </div>
      </form>
    </AuthLayout>
  );
};

export default SignupPage; 