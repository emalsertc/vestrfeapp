import { User } from '../store/userStore';
import { apiClient } from './ApiClient';
import { useUserStore } from '../store/userStore';

interface LoginResponse {
  message: string;
  user: {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    google_id: string | null;
    role: string;
  };
  token: string;
  refresh_token: string;
  expires_in: number;
}

class AuthService {
  async register(name: string, email: string, password: string, password_confirmation: string): Promise<{ user: User; token: string }> {
    const response = await apiClient.post('/api/auth/register', { 
      name, 
      email, 
      password, 
      password_confirmation 
    });

    return this.formatUserResponse(response);
  }

  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    const response = await apiClient.post('/api/auth/login', { 
      email, 
      password 
    });

    return this.formatUserResponse(response as LoginResponse);
  }

  async googleAuth(token: string): Promise<{ user: User; token: string }> {
    const response = await apiClient.post('/api/auth/google', { token });

    return this.formatUserResponse(response as LoginResponse);
  }

  private formatUserResponse(response: LoginResponse): { user: User; token: string } {
    return {
      user: {
        id: response.user.id.toString(),
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
      },
      token: response.token
    };
  }

  async logout(): Promise<void> {
    try {
      await apiClient.post('/api/auth/logout', {});
    } finally {
      // On vide le store même si la requête échoue
      useUserStore.getState().logout();
    }
  }
}

export const authService = new AuthService(); 