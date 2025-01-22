import React from 'react';
import { Sheet, Block } from 'konsta/react';
import { UserStore } from './UserStore';

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserModal: React.FC<UserModalProps> = ({ isOpen, onClose }) => {
  return (
    <Sheet
      opened={isOpen}
      onBackdropClick={onClose}
      className="h-[90%] rounded-t-[20px] bg-white dark:bg-gray-900"
    >
      <Block className="space-y-4">
        <UserStore />
      </Block>
    </Sheet>
  );
}; 