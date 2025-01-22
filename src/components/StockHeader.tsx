import React from 'react';

interface CompanyInfo {
  name: string;
  logo: string;
  industry: string;
  market_cap: number;
}

interface QuoteInfo {
  current_price: number;
  price_change: number;
  price_change_percent: number;
  high: number;
  low: number;
  open: number;
  previous_close: number;
}

interface StockHeaderProps {
  company: CompanyInfo;
  quote: QuoteInfo;
}

const StockHeader: React.FC<StockHeaderProps> = ({ company, quote }) => {
  const formatMarketCap = (value: number) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(2)}B`;
    if (value >= 1000) return `${(value / 1000).toFixed(2)}M`;
    return `${value.toFixed(2)}M`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-3 sm:p-6 mb-4">
      <div className="flex items-start gap-3 sm:gap-6">
        {company.logo && (
          <img 
            src={company.logo} 
            alt={`${company.name} logo`} 
            className="w-12 h-12 sm:w-16 sm:h-16 object-contain rounded-lg bg-gray-50 dark:bg-gray-700"
          />
        )}
        
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start gap-2">
            <div className="min-w-0">
              <h2 className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white truncate">{company.name}</h2>
              <div className="mt-0.5 sm:mt-1 flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-500 dark:text-gray-400 flex-wrap">
                {company.industry !== 'N/A' && (
                  <>
                    <span className="truncate">{company.industry}</span>
                    <span className="text-gray-300 dark:text-gray-600 hidden sm:inline">•</span>
                  </>
                )}
                <span className="whitespace-nowrap">Cap: {formatMarketCap(company.market_cap)}</span>
              </div>
            </div>
            
            <div className="text-right shrink-0">
              <div className="text-xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                ${quote.current_price.toFixed(2)}
              </div>
              <div className={`flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium ${
                quote.price_change >= 0 ? 'text-green-500' : 'text-red-500'
              }`}>
                <span>
                  {quote.price_change >= 0 ? '+' : ''}{quote.price_change.toFixed(2)}
                </span>
                <span>
                  ({quote.price_change_percent >= 0 ? '+' : ''}{quote.price_change_percent.toFixed(2)}%)
                </span>
              </div>
            </div>
          </div>

          <div className="mt-3 sm:mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-2 sm:p-3">
              <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Previous</div>
              <div className="text-sm sm:text-base font-medium text-gray-900 dark:text-white">
                ${quote.previous_close.toFixed(2)}
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-2 sm:p-3">
              <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Open</div>
              <div className="text-sm sm:text-base font-medium text-gray-900 dark:text-white">
                ${quote.open.toFixed(2)}
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-2 sm:p-3">
              <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">High</div>
              <div className="text-sm sm:text-base font-medium text-gray-900 dark:text-white">
                ${quote.high.toFixed(2)}
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-2 sm:p-3">
              <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Low</div>
              <div className="text-sm sm:text-base font-medium text-gray-900 dark:text-white">
                ${quote.low.toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockHeader; 