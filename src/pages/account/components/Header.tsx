import React from 'react';

interface HeaderProps {
  name: string;
  friendsCount: number;
}

export const Header: React.FC<HeaderProps> = ({ name, friendsCount }) => {
  return (
    <div className="flex items-start justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold mb-1">{name}</h1>
        <p className="text-gray-500 dark:text-gray-400">{friendsCount} friends</p>
      </div>
      <div className="w-12 h-12 rounded-full bg-[#7257FF] flex items-center justify-center text-white text-xl">
        {name.split(' ').map(n => n[0]).join('')}
      </div>
    </div>
  );
}; 