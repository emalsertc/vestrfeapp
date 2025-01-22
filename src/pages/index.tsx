import React from 'react';
import StockSearch from '../components/StockSearch';
import { UserStore } from '../components/UserStore';
import { useTheme } from '../contexts/ThemeContext';

export const HomePage = () => (
  <StockSearch />
);

export const StockAnalysisPage = () => <div>Analyse des marchés</div>;
export const AccountPage = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className="ios" style={{ padding: '20px' }}>
      <div className="flex items-center justify-end mb-4 gap-3">
        <span className="text-xl">☀️</span>
        <button
          onClick={toggleTheme}
          className={`
            relative inline-flex h-6 w-11 items-center rounded-full
            transition-colors duration-300 focus:outline-none
            ${theme === 'dark' ? 'bg-blue-600' : 'bg-gray-200'}
          `}
        >
          <span className="sr-only">Changer le thème</span>
          <span
            className={`
              inline-block h-4 w-4 transform rounded-full bg-white
              transition-transform duration-300
              ${theme === 'dark' ? 'translate-x-6' : 'translate-x-1'}
            `}
          />
        </button>
        <span className="text-xl">🌙</span>
      </div>
      <UserStore />
    </div>
  );
};
export const WatchlistPage = () => <div>Ma watchlist</div>;
export const TopStocksPage = () => <div>Top des actions</div>;
export const TopInvestorsPage = () => <div>Meilleurs traders</div>;
export const FAQPage = () => <div>Questions fréquentes</div>;
export const SocialPage = () => <div>Réseau social</div>;
export const PortfolioPage = () => <div>Mon portefeuille</div>;
export const ManualPage = () => <div>Guide d'utilisation</div>;
export const RiskAssessmentPage = () => <div>Évaluation du risque</div>;
export const CognitiveBiasPage = () => <div>Biais cognitifs</div>;

export { AuthCallback } from './AuthCallback';
  