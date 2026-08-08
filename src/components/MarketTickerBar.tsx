import React, { useState, useEffect, useCallback } from 'react';
import { MARKET_RATES } from '../data/energyData';
import { MarketRate } from '../types';
import { updateMarketRatesWithLiveApi } from '../services/oilPriceApi';
import { TrendingUp, TrendingDown, RefreshCw, Activity, ChevronRight, Zap } from 'lucide-react';

interface MarketTickerBarProps {
  onOpenCalculator: () => void;
}

export const MarketTickerBar: React.FC<MarketTickerBarProps> = ({ onOpenCalculator }) => {
  const [rates, setRates] = useState<MarketRate[]>(MARKET_RATES);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLiveApiActive, setIsLiveApiActive] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<string>('');

  const fetchLivePrices = useCallback(async () => {
    setIsRefreshing(true);
    const result = await updateMarketRatesWithLiveApi(rates);
    if (result.isLive) {
      setRates(result.rates);
      setIsLiveApiActive(true);
      setLastSyncTime(result.lastUpdatedTime);
    }
    setIsRefreshing(false);
  }, [rates]);

  useEffect(() => {
    // Fetch live prices on load
    fetchLivePrices();

    // Auto-refresh every 60 seconds
    const interval = setInterval(() => {
      fetchLivePrices();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    fetchLivePrices();
  };

  return (
    <div className="bg-black border-b border-neutral-800 overflow-hidden py-2.5 px-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left Label */}
        <div className="flex items-center gap-2 shrink-0 pr-3 border-r border-neutral-800">
          <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span className="text-xs font-bold text-white tracking-wider uppercase hidden sm:inline flex items-center gap-1.5">
            <span>Energy Markets</span>
            {isLiveApiActive && (
              <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
                <Zap className="w-2.5 h-2.5 fill-current" />
                LIVE API
              </span>
            )}
          </span>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="p-1 text-neutral-400 hover:text-white rounded hover:bg-neutral-800 transition-colors"
            title={`Refresh Live OilPrice API ${lastSyncTime ? `(Last updated: ${lastSyncTime})` : ''}`}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-emerald-400' : ''}`} />
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
                  <span className="font-bold text-white group-hover:text-emerald-400 transition-colors flex items-center gap-1">
                    {rate.symbol}
                  </span>
                  <span className="font-mono-num font-semibold text-white">
                    ${rate.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
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
