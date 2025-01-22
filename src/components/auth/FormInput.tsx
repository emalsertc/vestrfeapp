import React, { useState } from 'react';

interface FormInputProps {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
  validateOnBlur?: boolean;
  validate?: (value: string) => string | undefined;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  type = 'text',
  value,
  onChange,
  error,
  placeholder,
  required = false,
  autoComplete,
  validateOnBlur = false,
  validate,
}) => {
  const [touched, setTouched] = useState(false);
  const [localError, setLocalError] = useState<string>();

  const handleBlur = () => {
    setTouched(true);
    if (validateOnBlur && validate) {
      const validationError = validate(value);
      setLocalError(validationError);
    }
  };

  const displayError = error || (touched ? localError : undefined);

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={handleBlur}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={`w-full px-4 py-3 bg-white dark:bg-black rounded-2xl
          border ${displayError 
            ? 'border-red-500 dark:border-red-500' 
            : 'border-gray-200 dark:border-gray-800'
          }
          text-gray-900 dark:text-white
          placeholder-gray-400 dark:placeholder-gray-600
          focus:outline-none focus:ring-2 focus:ring-[#7257FF] dark:focus:ring-[#7257FF]
          transition-all duration-200`}
      />
      {displayError && (
        <p className="text-sm text-red-500 dark:text-red-400">{displayError}</p>
      )}
    </div>
  );
};

export default FormInput; 