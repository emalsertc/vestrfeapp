import { useState, useEffect, useCallback } from 'react';
import { authService } from '../services/AuthService';
import { useUserStore } from '../store/userStore';

interface User {
  id: string;
  name: string;
  email: string;
}

export const useAuth = () => {
  const { user, isAuthenticated } = useUserStore();

  const login = async (email: string, password: string) => {
    return await authService.login(email, password);
  };

  const register = async (name: string, email: string, password: string, password_confirmation: string) => {
    return await authService.register(name, email, password, password_confirmation);
  };

  const logout = async () => {
    await authService.logout();
    useUserStore.getState().logout();
  };

  return {
    isAuthenticated,
    user,
    login,
    register,
    logout,
  };
}; 