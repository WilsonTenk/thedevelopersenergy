import React, { useState } from 'react';
import { MARKET_RATES } from '../data/energyData';
import { MarketRate } from '../types';
import { TrendingUp, TrendingDown, RefreshCw, Activity, ChevronRight } from 'lucide-react';

interface MarketTickerBarProps {
  onOpenCalculator: () => void;
}

export const MarketTickerBar: React.FC<MarketTickerBarProps> = ({ onOpenCalculator }) => {
  const [rates, setRates] = useState<MarketRate[]>(MARKET_RATES);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      // Simulate minor price fluctuation
      setRates((prev) =>
        prev.map((r) => {
          const delta = (Math.random() - 0.48) * (r.price * 0.004);
          const newPrice = Number((r.price + delta).toFixed(2));
          const newChange = Number((r.change + delta).toFixed(2));
          const newPct = Number(((newChange / (newPrice - newChange)) * 100).toFixed(2));
          return {
            ...r,
            price: newPrice,
            change: newChange,
            changePct: newPct,
            lastUpdated: 'Just now',
          };
        })
      );
      setIsRefreshing(false);
    }, 600);
  };

  return (
    <div className="bg-black border-b border-neutral-800 overflow-hidden py-2.5 px-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left Label */}
        <div className="flex items-center gap-2 shrink-0 pr-3 border-r border-neutral-800">
          <Activity className="w-4 h-4 text-white animate-pulse" />
          <span className="text-xs font-bold text-white tracking-wider uppercase hidden sm:inline">
            Energy Markets
          </span>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="p-1 text-neutral-400 hover:text-white rounded hover:bg-neutral-800 transition-colors"
            title="Refresh Live Benchmarks"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-white' : ''}`} />
          </button>
        </div>

        {/* Ticker Carousel / Horizontal Scroll */}
        <div className="flex-1 overflow-x-auto no-scrollbar py-0.5">
          <div className="flex items-center space-x-6 min-w-max">
            {rates.map((rate) => {
              const isPositive = rate.change >= 0;
              return (
                <div
                  key={rate.id}
                  onClick={onOpenCalculator}
                  className="flex items-center space-x-2.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-600 px-3 py-1.5 rounded text-xs transition-all cursor-pointer group"
                >
                  <span className="font-bold text-white group-hover:text-neutral-300 transition-colors">
                    {rate.symbol}
                  </span>
                  <span className="font-mono-num font-semibold text-white">
                    {rate.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                  <span className="text-[10px] text-neutral-400">{rate.unit}</span>
                  <span
                    className={`font-mono-num font-medium flex items-center text-[11px] ${
                      isPositive ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {isPositive ? (
                      <TrendingUp className="w-3 h-3 mr-0.5" />
                    ) : (
                      <TrendingDown className="w-3 h-3 mr-0.5" />
                    )}
                    {isPositive ? '+' : ''}
                    {rate.changePct}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Link */}
        <button
          onClick={onOpenCalculator}
          className="hidden md:flex items-center gap-1 text-xs text-neutral-300 hover:text-white shrink-0 font-medium group transition-colors"
        >
          <span>Calculate Cargo Value</span>
          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};
