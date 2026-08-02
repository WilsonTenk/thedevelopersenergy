import React, { useState } from 'react';
import { X, Calculator, ArrowRight, ShieldCheck, RefreshCw } from 'lucide-react';

interface TradeCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onForwardQuote: (serviceTitle?: string) => void;
}

export const TradeCalculatorModal: React.FC<TradeCalculatorModalProps> = ({
  isOpen,
  onClose,
  onForwardQuote,
}) => {
  const [product, setProduct] = useState<'gasoil' | 'gasoline' | 'crude' | 'jet'>('gasoil');
  const [volumeMT, setVolumeMT] = useState<number>(5000);
  const [incoterm, setIncoterm] = useState<'CIF' | 'FOB'>('CIF');

  if (!isOpen) return null;

  // Pricing benchmarks
  const benchmarkPrices: Record<string, { priceUSD: number; bblFactor: number; label: string }> = {
    gasoil: { priceUSD: 768.5, bblFactor: 7.45, label: 'Gasoil 10ppm (Diesel)' },
    gasoline: { priceUSD: 812.3, bblFactor: 8.35, label: 'Unleaded Gasoline 95' },
    crude: { priceUSD: 601.8, bblFactor: 7.33, label: 'Brent / Light Crude (FOB WAF)' },
    jet: { priceUSD: 835.0, bblFactor: 7.85, label: 'Aviation Turbine Kerosene (Jet A-1)' },
  };

  const currentProduct = benchmarkPrices[product];
  const usdGhsRate = 15.28;
  const freightRateMT = incoterm === 'CIF' ? 38.2 : 0;

  const totalBaseCargoUSD = volumeMT * currentProduct.priceUSD;
  const totalFreightUSD = volumeMT * freightRateMT;
  const grossUSD = totalBaseCargoUSD + totalFreightUSD;
  const grossGHS = grossUSD * usdGhsRate;
  const totalBarrels = Math.round(volumeMT * currentProduct.bblFactor);

  const handleApplyToQuote = () => {
    onClose();
    onForwardQuote(`Cargo Quote: ${volumeMT.toLocaleString()} MT ${currentProduct.label} (${incoterm})`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-neutral-300 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[92vh] overflow-y-auto relative animate-in zoom-in-95 duration-200 text-black shadow-2xl">
        <div className="flex items-start justify-between border-b border-neutral-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-black text-white flex items-center justify-center">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-white bg-black px-2.5 py-0.5 rounded-full uppercase tracking-wider inline-block">
                B2B Energy Tools
              </span>
              <h2 className="text-2xl font-bold text-black mt-1">Cargo & Volume Estimator</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-500 hover:text-black p-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-neutral-700">Commodity Product</label>
            <select
              value={product}
              onChange={(e) => setProduct(e.target.value as any)}
              className="w-full bg-neutral-50 border border-neutral-300 text-black text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-black"
            >
              <option value="gasoil">Gasoil 10ppm</option>
              <option value="gasoline">Unleaded Gasoline 95</option>
              <option value="crude">Brent Crude (WAF)</option>
              <option value="jet">Jet A-1 Kerosene</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-neutral-700">Volume (Metric Tons)</label>
            <input
              type="number"
              min={100}
              max={100000}
              step={500}
              value={volumeMT}
              onChange={(e) => setVolumeMT(Number(e.target.value) || 0)}
              className="w-full bg-neutral-50 border border-neutral-300 text-black text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-black font-mono-num font-bold"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-neutral-700">Incoterm Delivery</label>
            <select
              value={incoterm}
              onChange={(e) => setIncoterm(e.target.value as any)}
              className="w-full bg-neutral-50 border border-neutral-300 text-black text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-black"
            >
              <option value="CIF">CIF Tema/Takoradi (+Freight)</option>
              <option value="FOB">FOB Load Port</option>
            </select>
          </div>
        </div>

        {/* Live Calculation Output Card */}
        <div className="bg-neutral-50 rounded-2xl p-6 border border-neutral-200 space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-200 pb-3 text-xs">
            <span className="text-neutral-500 font-semibold uppercase tracking-wider">
              ESTIMATED CARGO BREAKDOWN
            </span>
            <span className="text-black font-mono text-[11px] font-bold">
              1 USD = {usdGhsRate} GHS
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-3 rounded-xl border border-neutral-200">
              <span className="text-[10px] text-neutral-500 uppercase block">FOB Benchmark</span>
              <span className="text-base font-bold text-black font-mono-num">
                ${currentProduct.priceUSD.toFixed(2)} / MT
              </span>
            </div>

            <div className="bg-white p-3 rounded-xl border border-neutral-200">
              <span className="text-[10px] text-neutral-500 uppercase block">Total Barrels (~bbl)</span>
              <span className="text-base font-bold text-black font-mono-num">
                {totalBarrels.toLocaleString()} bbls
              </span>
            </div>

            <div className="bg-white p-3 rounded-xl border border-neutral-200">
              <span className="text-[10px] text-neutral-500 uppercase block">Est. Gross USD</span>
              <span className="text-base font-bold text-black font-mono-num">
                ${Math.round(grossUSD).toLocaleString()}
              </span>
            </div>

            <div className="bg-white p-3 rounded-xl border border-neutral-200">
              <span className="text-[10px] text-neutral-500 uppercase block">Est. Gross GHS</span>
              <span className="text-base font-bold text-emerald-700 font-mono-num">
                GH₵{Math.round(grossGHS).toLocaleString()}
              </span>
            </div>
          </div>

          <p className="text-[11px] text-neutral-500 leading-relaxed italic border-t border-neutral-200 pt-3">
            * Note: Calculations are based on indicative Platts/Argus daily benchmark rates and standard conversion density factors. Official deal term sheets subject to firm NPA window confirmation.
          </p>
        </div>

        {/* Action button */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-full text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 border border-neutral-300"
          >
            Close Estimator
          </button>

          <button
            onClick={handleApplyToQuote}
            className="w-full sm:w-auto px-7 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider text-white bg-black hover:bg-neutral-800 transition-colors shadow-md flex items-center justify-center gap-2"
          >
            <span>Request Firm Consultation Quote</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
