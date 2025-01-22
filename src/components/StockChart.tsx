import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { apiClient } from '../services/ApiClient';
import StockHeader from './StockHeader';

interface StockChartProps {
  symbol: string;
}

type Period = '1D' | '1M' | '1Y' | '5Y';

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

interface NewsItem {
  category: string;
  datetime: number;
  headline: string;
  id: number;
  image: string;
  related: string;
  source: string;
  summary: string;
  url: string;
}

interface ApiResponse {
  symbol: string;
  range: string;
  company: CompanyInfo;
  quote: QuoteInfo;
  news: NewsItem[];
  data: {
    [timestamp: string]: {
      open: number;
      high: number;
      low: number;
      close: number;
      volume: number;
    };
  };
}

const StockChart: React.FC<StockChartProps> = ({ symbol }) => {
  const [chartData, setChartData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('1M');
  const [stockInfo, setStockInfo] = useState<{ company: CompanyInfo; quote: QuoteInfo } | null>(null);

  const periods: Period[] = ['1D', '1M', '1Y', '5Y'];

  const getDateFormat = (dateStr: string, period: Period) => {
    const date = new Date(dateStr);
    switch (period) {
      case '1D':
        return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
      case '1M':
        return date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' });
      case '1Y':
        return date.toLocaleDateString('fr-FR', { month: 'short' });
      case '5Y':
        return date.toLocaleDateString('fr-FR', { month: '2-digit', year: '2-digit' });
      default:
        return date.toLocaleDateString();
    }
  };

  const fetchStockData = async (period: Period) => {
    setIsLoading(true);
    setError(null);

    try {
      const endpoint = `/api/stocks/${encodeURIComponent(symbol)}/historical/${period.toLowerCase()}`;
      const response: ApiResponse = await apiClient.get(endpoint);

      // Mettre à jour les informations de l'entreprise et le cours actuel
      setStockInfo({
        company: response.company,
        quote: response.quote
      });

      // Transformer les données historiques
      const formattedData = Object.entries(response.data).map(([timestamp, values]) => ({
        date: getDateFormat(timestamp, period),
        price: values.close,
        open: values.open,
        high: values.high,
        low: values.low,
        volume: values.volume,
      }));

      setChartData(formattedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement des données');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStockData(selectedPeriod);
  }, [symbol, selectedPeriod]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{label}</p>
          <div className="space-y-1">
            <p className="text-base font-semibold text-gray-900 dark:text-white">
              {data.price.toFixed(2)} $
            </p>
            <div className="text-sm text-gray-500 dark:text-gray-400 grid grid-cols-2 gap-x-4 gap-y-1">
              <span>Open:</span>
              <span className="text-right">{data.open.toFixed(2)} $</span>
              <span>High:</span>
              <span className="text-right">{data.high.toFixed(2)} $</span>
              <span>Low:</span>
              <span className="text-right">{data.low.toFixed(2)} $</span>
              <span>Volume:</span>
              <span className="text-right">{data.volume.toLocaleString()}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const calculateYDomain = (data: any[]) => {
    if (data.length === 0) return [0, 0];
    
    const prices = data.map(item => item.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const padding = (max - min) * 0.1;

    return [min - padding, max + padding];
  };

  const getLineColor = () => {
    if (!stockInfo) return '#3B82F6';
    return stockInfo.quote.price_change >= 0 ? '#22C55E' : '#EF4444';
  };

  return (
    <div className="space-y-4">
      {stockInfo && <StockHeader company={stockInfo.company} quote={stockInfo.quote} />}

      <div className="flex items-center justify-center">
        <div className="inline-flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
          {periods.map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-3 py-1.5 text-sm rounded-md transition-all duration-200 ${
                selectedPeriod === period
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      <div className="relative h-[300px] sm:h-[400px] bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-2 sm:p-4">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90 backdrop-blur-sm z-10">
            <div className="relative flex flex-col items-center">
              <div className="relative w-12 sm:w-16 h-12 sm:h-16">
                <div className="absolute inset-0 border-4 border-blue-200 dark:border-blue-800 rounded-full"></div>
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
              <div className="mt-4 text-sm sm:text-base text-blue-500 font-medium animate-pulse">
                Chargement...
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="text-red-500 bg-red-50 dark:bg-red-900/20 px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-sm border border-red-100 dark:border-red-800 text-sm">
              <div className="flex items-center gap-2">
                <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            </div>
          </div>
        )}

        {chartData.length > 0 && !isLoading && !error && (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(107, 114, 128, 0.1)" vertical={false} />
              <XAxis 
                dataKey="date" 
                tick={{ fill: '#6B7280', fontSize: 10 }}
                tickLine={false}
                axisLine={false}
                interval="preserveStartEnd"
                dy={5}
                stroke="#6B7280"
              />
              <YAxis 
                tick={{ fill: '#6B7280', fontSize: 10 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value.toFixed(2)}$`}
                domain={calculateYDomain(chartData)}
                dx={-5}
                width={45}
                stroke="#6B7280"
              />
              <Tooltip 
                content={<CustomTooltip />}
                wrapperStyle={{ zIndex: 100 }}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke={getLineColor()}
                strokeWidth={1.5}
                dot={false}
                activeDot={{ r: 4, fill: getLineColor(), stroke: '#fff', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default StockChart; 