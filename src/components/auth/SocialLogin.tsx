import React from 'react';

interface SocialLoginProps {
  onGoogleLogin: () => void;
  isLoading?: boolean;
}

const SocialLogin: React.FC<SocialLoginProps> = ({ onGoogleLogin, isLoading }) => {
  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200 dark:border-gray-800" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-gray-50 dark:bg-black text-gray-500 dark:text-gray-400">
            OU
          </span>
        </div>
      </div>

      <button
        onClick={onGoogleLogin}
        disabled={isLoading}
        className="button w-full justify-center gap-3"
      >
        {isLoading ? (
          <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27 3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10 5.35 0 9.25-3.67 9.25-9.09 0-1.15-.15-1.81-.15-1.81z"
              />
            </svg>
            Continuer avec Google
          </>
        )}
      </button>
    </div>
  );
};

export default SocialLogin; 