import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { BackButton } from '../../../components/BackButton';
import { useUserStore } from '../../../store/userStore';
import { useAuth } from '../../../hooks/useAuth';
import ConfirmationModal from '../../../components/ConfirmationModal';

interface SettingItemProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  danger?: boolean;
}

const SettingItem: React.FC<SettingItemProps> = ({ icon, label, onClick, danger }) => (
  <button 
    onClick={onClick} 
    className={danger ? 'button-danger w-full' : 'button w-full'}
  >
    <div className="flex items-center gap-3">
      {icon}
      <span className="text-lg">{label}</span>
    </div>
    <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  </button>
);

const SettingsPage: React.FC = () => {
  const user = useUserStore(state => state.user);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!user) return null;

  const handleLogout = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      await logout();
      navigate('/auth/login');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    } finally {
      setIsLoading(false);
      setIsLogoutModalOpen(false);
    }
  };

  return (
    <div className="p-4">
      <BackButton className="mb-6" />
      
      <Header name={user.name} friendsCount={user.friendsCount} />
      
      <h2 className="text-2xl font-bold mb-6">Settings</h2>
      
      <div className="space-y-4">
        <SettingItem
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          }
          label="Personal data"
          onClick={() => {}}
        />

        <SettingItem
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
            </svg>
          }
          label="Langue"
          onClick={() => {}}
        />

        <SettingItem
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          }
          label="Apparence"
          onClick={() => {}}
        />

        <SettingItem
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          }
          label="Notifications"
          onClick={() => {}}
        />

        <SettingItem
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          }
          label="Sécurité & Confidentialité"
          onClick={() => {}}
        />

        <SettingItem
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          }
          label="Others"
          onClick={() => {}}
        />

        <div className="pt-4">
          <SettingItem
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            }
            label="Se déconnecter"
            onClick={() => setIsLogoutModalOpen(true)}
            danger
          />
        </div>
      </div>

      <ConfirmationModal
        isOpen={isLogoutModalOpen}
        title="Êtes-vous sûr de vouloir vous déconnecter ?"
        onConfirm={handleLogout}
        onCancel={() => !isLoading && setIsLogoutModalOpen(false)}
        confirmText={isLoading ? "Déconnexion..." : "Se déconnecter"}
        cancelText="Annuler"
        isDanger
      />
    </div>
  );
};

export default SettingsPage; 