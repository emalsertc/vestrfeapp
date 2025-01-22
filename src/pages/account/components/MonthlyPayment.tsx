import React from 'react';

export const MonthlyPayment: React.FC = () => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">Monthly Payment</h2>
      <div className="flex gap-4">
        <div className="card aspect-square w-24 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold">0</span>
          <span className="text-xs text-gray-500">/mois*</span>
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <button className="button">Share</button>
          <p className="text-sm text-gray-500">How to reduce the price ?</p>
        </div>
      </div>
    </div>
  );
}; 