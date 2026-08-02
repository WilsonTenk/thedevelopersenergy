import React from 'react';
import { Building2, ShieldCheck, Zap, Globe2, Award, Landmark, Truck, Anchor } from 'lucide-react';

export interface PartnerItem {
  id: string;
  name: string;
  shortName: string;
  category: string;
  location: string;
  type: string;
  iconName: string;
}

export const TRUSTED_PARTNERS: PartnerItem[] = [
  {
    id: 'npa',
    name: 'National Petroleum Authority',
    shortName: 'NPA',
    category: 'Regulator & Policy',
    location: 'Ghana',
    type: 'Government Petroleum Authority',
    iconName: 'Landmark'
  },
  {
    id: 'gnpc',
    name: 'Ghana National Petroleum Corp',
    shortName: 'GNPC',
    category: 'Upstream & Offtake',
    location: 'West Africa',
    type: 'National Oil Company',
    iconName: 'Zap'
  },
  {
    id: 'bost',
    name: 'Bulk Oil Storage & Transportation',
    shortName: 'BOST',
    category: 'Terminal & Depot Network',
    location: 'Ghana',
    type: 'Strategic Reserve Operator',
    iconName: 'Truck'
  },
  {
    id: 'tor',
    name: 'Tema Oil Refinery',
    shortName: 'TOR',
    category: 'Refining & Processing',
    location: 'Tema, Ghana',
    type: 'Petroleum Refinery',
    iconName: 'Building2'
  },
  {
    id: 'stanbic',
    name: 'Stanbic Bank Trade Desk',
    shortName: 'Stanbic Bank',
    category: 'Trade Finance & LC',
    location: 'International',
    type: 'Tier-1 Energy Finance',
    iconName: 'ShieldCheck'
  },
  {
    id: 'ecobank',
    name: 'Ecobank Energy & Commodities',
    shortName: 'Ecobank',
    category: 'Syndicated LC Lines',
    location: 'Pan-African',
    type: 'Commodity Banking',
    iconName: 'Globe2'
  },
  {
    id: 'vitol',
    name: 'Vitol Energy Group',
    shortName: 'Vitol',
    category: 'Physical Oil Trading',
    location: 'Global',
    type: 'International Commodity Trader',
    iconName: 'Anchor'
  },
  {
    id: 'trafigura',
    name: 'Trafigura Trading',
    shortName: 'Trafigura',
    category: 'Refined Product Allocations',
    location: 'Global',
    type: 'Energy Off-taker',
    iconName: 'Award'
  },
  {
    id: 'goil',
    name: 'GOIL PLC',
    shortName: 'GOIL',
    category: 'Downstream Retail',
    location: 'Ghana',
    type: 'Oil Marketing Company',
    iconName: 'Building2'
  },
  {
    id: 'chase',
    name: 'Chase Petroleum Ghana',
    shortName: 'Chase Petroleum',
    category: 'Bulk Distribution',
    location: 'West Africa',
    type: 'BDC Operations',
    iconName: 'Truck'
  }
];

export const PartnersMarquee: React.FC = () => {
  const getPartnerIcon = (iconName: string) => {
    switch (iconName) {
      case 'Landmark':
        return <Landmark className="w-5 h-5 text-black" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-black" />;
      case 'Truck':
        return <Truck className="w-5 h-5 text-black" />;
      case 'Building2':
        return <Building2 className="w-5 h-5 text-black" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-black" />;
      case 'Globe2':
        return <Globe2 className="w-5 h-5 text-black" />;
      case 'Anchor':
        return <Anchor className="w-5 h-5 text-black" />;
      default:
        return <Award className="w-5 h-5 text-black" />;
    }
  };

  // Duplicate the items for seamless infinite scroll
  const marqueeItems = [...TRUSTED_PARTNERS, ...TRUSTED_PARTNERS];

  return (
    <section className="py-14 bg-neutral-900 text-white overflow-hidden border-y border-neutral-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-black text-xs font-extrabold uppercase tracking-widest shadow-sm">
          <ShieldCheck className="w-4 h-4 text-black" />
          <span>Institutional Ecosystem</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Our Trusted Industry Partners & Counterparties
        </h2>
        <p className="text-neutral-400 text-xs sm:text-sm max-w-2xl mx-auto">
          Collaborating with premier regulatory bodies, trade finance institutions, refineries, and international commodity desks across Africa.
        </p>
      </div>

      {/* Marquee Container with Fade Overlay Edges */}
      <div className="relative w-full overflow-hidden py-4">
        {/* Left Fade Gradient Mask */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-neutral-900 via-neutral-900/80 to-transparent z-10 pointer-events-none" />
        
        {/* Right Fade Gradient Mask */}
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-neutral-900 via-neutral-900/80 to-transparent z-10 pointer-events-none" />

        {/* Moving Ticker Strip */}
        <div className="animate-marquee flex items-center gap-5">
          {marqueeItems.map((partner, index) => (
            <div
              key={`${partner.id}-${index}`}
              className="shrink-0 bg-neutral-950/90 border border-neutral-800 hover:border-neutral-500 rounded-2xl px-5 py-4 w-64 sm:w-72 transition-all duration-300 group hover:scale-[1.02] shadow-lg cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2.5">
                <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shrink-0 border border-neutral-200 shadow-sm group-hover:bg-neutral-100 transition-colors">
                  {getPartnerIcon(partner.iconName)}
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-400 bg-neutral-900 px-2.5 py-1 rounded-full border border-neutral-800">
                  {partner.location}
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="text-sm font-extrabold text-white group-hover:text-neutral-200 transition-colors truncate">
                  {partner.name}
                </h3>
                <div className="flex items-center justify-between text-[11px] text-neutral-400 font-medium">
                  <span className="text-neutral-300 font-semibold">{partner.category}</span>
                  <span className="text-[10px] font-mono text-neutral-500">{partner.shortName}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
