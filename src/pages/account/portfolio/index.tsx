import React from 'react';
import { Header } from '../components/Header';
import { BackButton } from '../../../components/BackButton';
import { useUserStore } from '../../../store/userStore';

const PortfolioPage: React.FC = () => {
  const user = useUserStore(state => state.user);

  if (!user) return null;

  return (
    <div className="p-4">
      <BackButton className="mb-6" />
      
      <Header name={user.name} friendsCount={user.friendsCount} />
      
      <h2 className="text-2xl font-bold mb-6">Portefeuille</h2>
      
      <div className="space-y-4">
        <button className="button w-full">
          <span className="text-lg">Simulation</span>
        </button>

        <button className="button w-full">
          <span className="text-lg">Comptes</span>
        </button>

        <button className="button w-full">
          <span className="text-lg">Patrimoine Boursier</span>
        </button>

        <button className="button w-full">
          <span className="text-lg">Performance</span>
        </button>

        <button className="button w-full">
          <span className="text-lg">Répartition actif</span>
        </button>
      </div>
    </div>
  );
};

export default PortfolioPage; 