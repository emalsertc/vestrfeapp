import { config } from '../config';

// Routes qui ne nécessitent pas d'authentification
const PUBLIC_ROUTES = [
  '/api/auth/login',
  '/api/auth/register',
  '/api/auth/google',
];

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    friends_count?: number;
    sponsorships?: {
      active: string[];
      pending: string[];
      max_count: number;
    };
    subscription?: {
      status: 'active' | 'cancelled' | 'pending';
      monthly_payment: number;
    };
  };
}

export async function fetchWithAuth(
  endpoint: string,
  options: RequestInit & { token?: string | null } = {}
) {
  const { token, ...fetchOptions } = options;
  const headers = new Headers(fetchOptions.headers);
  
  headers.set('Content-Type', 'application/json');

  // Ajouter le token seulement si ce n'est pas une route publique
  const isPublicRoute = PUBLIC_ROUTES.some(route => endpoint.startsWith(route));
  if (!isPublicRoute && token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${config.apiUrl}${endpoint}`, {
    ...fetchOptions,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Une erreur est survenue' }));
    
    // Pour les routes publiques, on renvoie simplement l'erreur
    if (isPublicRoute) {
      throw new Error(error.message || 'Erreur lors de la requête');
    }
    
    // Pour les routes protégées, on inclut le statut dans le message pour gérer le 401
    throw new Error(`${error.message} (${response.status})`);
  }

  return response.json();
} 