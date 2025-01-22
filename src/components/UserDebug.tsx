import React from 'react';
import { Block } from 'konsta/react';
import { useUserStore } from '../store/userStore';

const UserDebug: React.FC = () => {
  const { user, token, isAuthenticated } = useUserStore();

  return (
    <Block className="p-4 bg-gray-100 rounded-lg">
      <h3 className="text-lg font-bold mb-2">Debug Info</h3>
      <pre className="whitespace-pre-wrap text-sm">
        {JSON.stringify(
          {
            user,
            token: token ? '***' : null,
            isAuthenticated,
          },
          null,
          2
        )}
      </pre>
    </Block>
  );
};

export default UserDebug; 