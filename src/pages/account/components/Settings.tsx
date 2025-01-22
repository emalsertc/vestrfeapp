import React from 'react';
import { useNavigate } from 'react-router-dom';

interface SettingItemProps {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

const SettingItem: React.FC<SettingItemProps> = ({ label, icon, onClick }) => (
  <button onClick={onClick} className="button">
    <span>{label}</span>
    {icon || (
      <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    )}
  </button>
);

export const Settings: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-4 mb-8">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold">Paramètres</h2>
        <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </div>
      <SettingItem 
        label="Gérer mes paramètres" 
        onClick={() => navigate('/account/settings')}
      />
    </div>
  );
}; 