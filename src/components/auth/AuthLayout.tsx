import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-black">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="flex justify-center">
          <img
            src="/vestr-logo.svg"
            alt="Vestr"
            className="h-12 w-auto dark:invert"
          />
        </div>

        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {subtitle}
            </p>
          )}
        </div>

        {/* Content */}
        <div className="card p-6 space-y-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout; 