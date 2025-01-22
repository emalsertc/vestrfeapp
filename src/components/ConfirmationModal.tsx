import React, { useEffect } from 'react';

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  isDanger?: boolean;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  title,
  onConfirm,
  onCancel,
  confirmText = 'Yes',
  cancelText = 'Cancel',
  isDanger = false,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop with blur */}
      <div 
        className="absolute inset-0 bg-black/30 dark:bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={onCancel}
      />
      
      {/* Modal */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-stretch p-4 animate-slide-up">
        <div className="w-full bg-white dark:bg-black rounded-2xl overflow-hidden shadow-xl">
          {/* Title */}
          <div className="p-6">
            <h2 className="text-center text-[17px] text-gray-900 dark:text-white">
              {title}
            </h2>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 p-4 pt-0">
            <button
              onClick={onConfirm}
              className={isDanger ? 'button-danger flex-1 justify-center' : 'button flex-1 justify-center'}
            >
              {confirmText}
            </button>
            <button
              onClick={onCancel}
              className="button flex-1 justify-center"
            >
              {cancelText}
            </button>
          </div>
        </div>

        {/* Bottom safe area spacer */}
        <div className="h-6" />
      </div>
    </div>
  );
};

export default ConfirmationModal; 