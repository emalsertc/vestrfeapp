import { fetchWithAuth } from './api';
import { useUserStore } from '../store/userStore';

class ApiClient {
  private getToken(): string | null {
    return useUserStore.getState().token;
  }

  public async get(endpoint: string) {
    const token = this.getToken();
    try {
      return await fetchWithAuth(endpoint, {
        method: 'GET',
        token,
      });
    } catch (error) {
      if (error instanceof Error && error.message.includes('401')) {
        // Si le token est expiré, on déconnecte l'utilisateur
        useUserStore.getState().logout();
        throw new Error('Session expirée, veuillez vous reconnecter');
      }
      throw error;
    }
  }

  public async post(endpoint: string, data: unknown) {
    const token = this.getToken();
    try {
      return await fetchWithAuth(endpoint, {
        method: 'POST',
        body: JSON.stringify(data),
        token,
      });
    } catch (error) {
      if (error instanceof Error && error.message.includes('401')) {
        useUserStore.getState().logout();
        throw new Error('Session expirée, veuillez vous reconnecter');
      }
      throw error;
    }
  }

  public async put(endpoint: string, data: unknown) {
    const token = this.getToken();
    try {
      return await fetchWithAuth(endpoint, {
        method: 'PUT',
        body: JSON.stringify(data),
        token,
      });
    } catch (error) {
      if (error instanceof Error && error.message.includes('401')) {
        useUserStore.getState().logout();
        throw new Error('Session expirée, veuillez vous reconnecter');
      }
      throw error;
    }
  }

  public async delete(endpoint: string) {
    const token = this.getToken();
    try {
      return await fetchWithAuth(endpoint, {
        method: 'DELETE',
        token,
      });
    } catch (error) {
      if (error instanceof Error && error.message.includes('401')) {
        useUserStore.getState().logout();
        throw new Error('Session expirée, veuillez vous reconnecter');
      }
      throw error;
    }
  }
}

export const apiClient = new ApiClient(); 