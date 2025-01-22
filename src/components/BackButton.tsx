import React from 'react';
import { useNavigate } from 'react-router-dom';

interface BackButtonProps {
  className?: string;
  label?: string;
}

export const BackButton: React.FC<BackButtonProps> = ({ 
  className = '',
  label = 'Retour'
}) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className={`inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors ${className}`}
    >
      <svg 
        className="w-5 h-5 mr-2" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M10 19l-7-7m0 0l7-7m-7 7h18" 
        />
      </svg>
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}; 