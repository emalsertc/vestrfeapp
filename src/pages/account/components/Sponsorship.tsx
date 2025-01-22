import React, { useState } from 'react';

interface Sponsor {
  name: string;
  status: 'active' | 'pending';
}

export const Sponsorship: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'parrainés' | 'en attente'>('parrainés');
  const sponsors: Sponsor[] = [
    { name: 'Thomas', status: 'active' },
    { name: 'Clément', status: 'active' },
    { name: 'Éliot', status: 'active' },
    { name: 'Trevor', status: 'active' },
    { name: 'Sabine', status: 'pending' },
    { name: 'Pierre', status: 'pending' },
  ];

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">Parrainage</h2>
      <div className="flex gap-2 mb-4 p-1 bg-gray-100 dark:bg-gray-800 rounded-full">
        <button
          onClick={() => setActiveTab('parrainés')}
          className={`sponsorship-tab ${activeTab === 'parrainés' ? 'active' : 'inactive'}`}
        >
          parrainés
        </button>
        <button
          onClick={() => setActiveTab('en attente')}
          className={`sponsorship-tab ${activeTab === 'en attente' ? 'active' : 'inactive'}`}
        >
          en attente
        </button>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {sponsors
          .filter(s => s.status === (activeTab === 'parrainés' ? 'active' : 'pending'))
          .map(sponsor => (
            <div key={sponsor.name} className="card p-3">
              <span className="text-sm font-medium">{sponsor.name}</span>
            </div>
          ))}
      </div>
      <div className="mt-2 h-1 bg-[#7257FF] rounded-full" style={{ width: '100%' }}>
        <span className="text-xs text-gray-500 dark:text-white mt-1 float-right">4/4</span>
      </div>
    </div>
  );
}; 