import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useUserStore } from '../../store/userStore';
import { Header } from './components/Header';
import { QuickActions } from './components/QuickActions';
import { Sponsorship } from './components/Sponsorship';
import { MonthlyPayment } from './components/MonthlyPayment';
import { Settings } from './components/Settings';

export const AccountPage = () => {
  const { theme, toggleTheme } = useTheme();
  const user = useUserStore(state => state.user);
  const token = useUserStore(state => state.token);
  const isAuthenticated = useUserStore(state => state.isAuthenticated);
  
  if (!user) return null;

  return (
    <div className="ios p-4 max-w-2xl mx-auto">
      <div className="flex justify-end mb-4">
        <button
          onClick={toggleTheme}
          className={`
            relative inline-flex h-6 w-11 items-center rounded-full
            transition-colors duration-300 focus:outline-none
            ${theme === 'dark' ? 'bg-[#7257FF]' : 'bg-gray-200'}
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
      </div>

      <Header 
        name={user.name}
        friendsCount={user.friendsCount}
      />
      <QuickActions />
      <Sponsorship />
      <MonthlyPayment />
      <Settings />

      {/* Debug section */}
      <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-xl">
        <h3 className="text-lg font-bold mb-4">Debug Info</h3>
        <div className="space-y-2 font-mono text-sm">
          <p>isAuthenticated: {isAuthenticated.toString()}</p>
          <div>
            <p className="mb-1">Token:</p>
            <div className="p-2 bg-gray-200 dark:bg-gray-700 rounded overflow-auto">
              <p className="break-all">{token || 'No token'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage; 