import React, { useState } from 'react';
import FormInput from './FormInput';

interface PasswordInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
  showStrength?: boolean;
  validateOnBlur?: boolean;
  validate?: (value: string) => string | undefined;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  value,
  onChange,
  error,
  placeholder,
  required = false,
  showStrength = false,
  validateOnBlur = false,
  validate: externalValidate,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  
  const getPasswordStrength = (password: string): { score: number; message: string } => {
    if (!password) return { score: 0, message: '' };
    
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    const messages = [
      'Très faible',
      'Faible',
      'Moyen',
      'Fort',
      'Très fort'
    ];

    return { score, message: messages[score - 1] || '' };
  };

  const strength = showStrength ? getPasswordStrength(value) : null;

  const defaultValidate = (value: string): string | undefined => {
    if (!value) return 'Le mot de passe est requis';
    if (value.length < 8) return 'Le mot de passe doit contenir au moins 8 caractères';
    if (!/[A-Z]/.test(value)) return 'Le mot de passe doit contenir au moins une majuscule';
    if (!/[0-9]/.test(value)) return 'Le mot de passe doit contenir au moins un chiffre';
    return undefined;
  };

  const validate = externalValidate || defaultValidate;

  return (
    <div className="space-y-2">
      <div className="relative">
        <FormInput
          label={label}
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          error={error}
          placeholder={placeholder}
          required={required}
          autoComplete="current-password"
          validateOnBlur={validateOnBlur}
          validate={validate}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-[38px] text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          {showPassword ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
            </svg>
          )}
        </button>
      </div>
      
      {showStrength && strength && value && (
        <div className="space-y-1">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((level) => (
              <div
                key={level}
                className={`h-1 flex-1 rounded-full transition-colors duration-200 ${
                  level <= strength.score
                    ? [
                        'bg-red-500',
                        'bg-orange-500',
                        'bg-yellow-500',
                        'bg-green-500',
                        'bg-[#7257FF]'
                      ][strength.score - 1]
                    : 'bg-gray-200 dark:bg-gray-800'
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Force : {strength.message}
          </p>
        </div>
      )}
    </div>
  );
};

export default PasswordInput; 