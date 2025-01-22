import React, { useState } from 'react';
import { apiClient } from '../services/ApiClient';
import StockChart from './StockChart';

interface StockResult {
  symbol: string;
  description: string;
  type: string;
  currency: string;
  exchange: string;
}

interface SearchResponse {
  count: number;
  result: StockResult[];
}

const StockSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<StockResult[]>([]);
  const [selectedStock, setSelectedStock] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchStocks = async (query: string) => {
    return apiClient.get(`/api/stocks/search/${encodeURIComponent(query)}`);
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    setIsLoading(true);
    setError(null);
    setResults([]);
    setSelectedStock(null);

    try {
      const data: SearchResponse = await searchStocks(searchTerm);
      
      if (!data || !data.result) {
        throw new Error('Format de réponse invalide');
      }

      setResults(data.result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="relative">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Rechercher une action..."
              className="w-full p-3 pl-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
              disabled={isLoading}
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <button
            onClick={handleSearch}
            disabled={isLoading}
            className="w-12 h-12 flex items-center justify-center bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 transition-colors shadow-sm hover:shadow-md"
            aria-label="Rechercher"
          >
            {isLoading ? (
              <div className="relative w-5 h-5">
                <div className="absolute inset-0 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <div className="absolute inset-0 border-2 border-white border-t-transparent rounded-full animate-pulse opacity-50" style={{ animationDelay: '0.2s' }}></div>
              </div>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center gap-3">
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          {error}
        </div>
      )}

      {isLoading && !error && (
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
            <div 
              className="absolute inset-0 border-4 border-blue-500 rounded-full animate-spin"
              style={{ 
                borderTopColor: 'transparent',
                borderLeftColor: 'transparent',
                animationDuration: '1s',
                animationTimingFunction: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)'
              }}
            ></div>
          </div>
          <p className="text-gray-500 animate-pulse">Recherche en cours...</p>
        </div>
      )}

      {!isLoading && results.length === 0 && searchTerm && !error && (
        <div className="text-center py-12">
          <p className="text-gray-500">Aucun résultat trouvé pour "{searchTerm}"</p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6">
        {results.map((stock) => (
          <div
            key={stock.symbol}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border border-gray-100 dark:border-gray-700"
          >
            <div 
              className="p-6 cursor-pointer"
              onClick={() => setSelectedStock(selectedStock === stock.symbol ? null : stock.symbol)}
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{stock.description}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="inline-block px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-md font-mono">
                      {stock.symbol}
                    </span>
                    {stock.type && (
                      <>
                        <span className="text-gray-400 dark:text-gray-500">•</span>
                        <span>{stock.type}</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="text-right text-sm space-y-1">
                  <p className="text-gray-600 dark:text-gray-300">
                    <span className="font-medium">{stock.exchange}</span>
                  </p>
                  <p className="text-gray-500 dark:text-gray-400">
                    <span className="font-medium">{stock.currency}</span>
                  </p>
                </div>
              </div>
            </div>

            {selectedStock === stock.symbol && (
              <div className="border-t border-gray-100 dark:border-gray-700 p-6 bg-gray-50 dark:bg-gray-900/50">
                <StockChart symbol={stock.symbol} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockSearch; 