import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';

const menuItems = [
  { path: '/home', label: 'Recherche', emoji: '🔍' },
  { path: '/stock-analysis', label: 'Analyse', emoji: '📊' },
  { path: '/watchlist', label: 'Watchlist', emoji: '👀' },
  { path: '/portfolio', label: 'Portfolio', emoji: '💼' },
  { path: '/top-stocks', label: 'Top Actions', emoji: '⭐' },
  { path: '/top-investors', label: 'Top Traders', emoji: '🏆' },
  { path: '/social', label: 'Social', emoji: '👥' },
  { path: '/risk-assessment', label: 'Risque', emoji: '🎯' },
  { path: '/cognitive-bias', label: 'Biais', emoji: '🧠' },
  { path: '/faq', label: 'FAQ', emoji: '❓' },
  { path: '/manual', label: 'Guide', emoji: '📖' },
  { path: '/account', label: 'Compte', emoji: '⚙️' },
];

const mobileMenuItems = [
  { path: '/home', label: 'Recherche', emoji: '🔍' },
  { path: '/watchlist', label: 'Watchlist', emoji: '👀' },
  { path: '/portfolio', label: 'Portfolio', emoji: '💼' },
  { path: '/social', label: 'Social', emoji: '👥' },
];

export const Layout = () => {
  const [sheetOpened, setSheetOpened] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Sidebar desktop */}
      <div className="hidden md:block w-64 border-r border-gray-200 dark:border-gray-700 overflow-y-auto bg-white dark:bg-gray-800 scrollbar-hide">
        <div className="p-4">
          <div className="space-y-1">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `
                  block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors
                  ${isActive 
                    ? 'bg-[#7257FF] text-white' 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                  }
                `}
              >
                <span className="flex items-center gap-3">
                  <span className="text-xl">{item.emoji}</span>
                  {item.label}
                </span>
              </NavLink>
            ))}
          </div>
        </div>
      </div>

      {/* Zone de contenu */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto pt-[calc(env(safe-area-inset-top,20px)+16px)] pb-[calc(64px+env(safe-area-inset-bottom,20px))] md:pt-0 md:pb-0">
          <Outlet />
        </div>
      </div>

      {/* Navigation mobile */}
      <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[95%] md:hidden">
        {/* Fond flouté style iOS */}
        <div className="absolute inset-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-gray-200 dark:border-gray-700 rounded-3xl" />
        
        {/* Safe area pour iPhone */}
        <div className="relative grid grid-cols-5 gap-0 h-16">
          {mobileMenuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex flex-col items-center justify-center h-full
                ${isActive ? 'text-[#7257FF]' : 'text-gray-600 dark:text-gray-400'}
              `}
            >
              <span className="text-xl mb-0.5">{item.emoji}</span>
              <span className="text-[11px]">{item.label}</span>
            </NavLink>
          ))}
          <button
            onClick={() => setSheetOpened(true)}
            className="flex flex-col items-center justify-center h-full text-gray-600 dark:text-gray-400"
          >
            <span className="text-xl mb-0.5">☰</span>
            <span className="text-[11px]">Menu</span>
          </button>
        </div>
      </nav>

      {/* Sheet (Modal iOS) pour le menu mobile */}
      <div 
        className={`
          fixed inset-0 z-50 md:hidden px-4 pb-4
          ${sheetOpened ? 'pointer-events-auto' : 'pointer-events-none'}
        `}
      >
        {/* Backdrop */}
        <div 
          className={`
            absolute inset-0 bg-black/50 transition-opacity duration-300
            ${sheetOpened ? 'opacity-100' : 'opacity-0'}
          `}
          onClick={() => setSheetOpened(false)}
        />

        {/* Menu */}
        <div 
          className={`
            absolute w-[95%] max-h-[80vh] overflow-y-auto
            bg-white dark:bg-gray-800 rounded-3xl
            border border-gray-200 dark:border-gray-700
            left-1/2 bottom-[calc(env(safe-area-inset-bottom,20px)+80px)] -translate-x-1/2
            transition-all duration-300 shadow-xl
            ${sheetOpened ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}
          `}
        >
          <div className="sticky top-0 flex justify-between items-center p-4 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Menu</h2>
            <button 
              onClick={() => setSheetOpened(false)}
              className="text-[#7257FF] font-medium"
            >
              Fermer
            </button>
          </div>
          <div className="px-2 pb-2">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setSheetOpened(false)}
                className={({ isActive }) => `
                  block px-4 py-3 rounded-xl text-base font-medium transition-colors
                  ${isActive 
                    ? 'bg-[#7257FF] text-white' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                  }
                `}
              >
                <span className="flex items-center gap-4">
                  <span className="text-xl w-8">{item.emoji}</span>
                  {item.label}
                </span>
              </NavLink>
            ))}
          </div>
        </div>
      </div>

      <style>
        {`
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
    </div>
  );
};

export default Layout; 