import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export const UserStore = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  if (!user) return null;

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/auth/login');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0 w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
          <span className="text-xl font-bold text-gray-600 dark:text-gray-300">
            {user.name.charAt(0).toUpperCase()}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-lg font-medium text-gray-900 dark:text-white truncate">
            {user.name}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
            {user.email}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="flex-shrink-0 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
        >
          Se déconnecter
        </button>
      </div>
    </div>
  );
}; 