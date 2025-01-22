import React from 'react';
import { useNavigate } from 'react-router-dom';

interface QuickActionProps {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

const QuickAction: React.FC<QuickActionProps> = ({ label, icon, onClick }) => (
  <button onClick={onClick} className="button">
    <span>{label}</span>
    {icon || (
      <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    )}
  </button>
);

export const QuickActions: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-4 mb-8">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold">Portefeuille</h2>
        <div className="badge">6</div>
      </div>
      <QuickAction 
        label="Voir mon portefeuille" 
        onClick={() => navigate('/account/portfolio')}
      />
    </div>
  );
}; 