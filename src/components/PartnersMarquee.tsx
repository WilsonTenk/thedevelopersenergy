import React from 'react';
import { Building2, ShieldCheck, Zap, Globe2, Award, Landmark, Truck, Anchor } from 'lucide-react';
import { SITE_IMAGES } from '../data/imageData';

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
        return <Landmark className="w-5 h-5 text-white" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-white" />;
      case 'Truck':
        return <Truck className="w-5 h-5 text-white" />;
      case 'Building2':
        return <Building2 className="w-5 h-5 text-white" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-white" />;
      case 'Globe2':
        return <Globe2 className="w-5 h-5 text-white" />;
      case 'Anchor':
        return <Anchor className="w-5 h-5 text-white" />;
      default:
        return <Award className="w-5 h-5 text-white" />;
    }
  };

  const marqueeItems = [...TRUSTED_PARTNERS, ...TRUSTED_PARTNERS];

  return (
    <section className="relative py-14 text-white overflow-hidden border-y border-neutral-800">
      {/* Background Image — hero-style treatment */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src={SITE_IMAGES.horizontalBanners.partnersSection}
          alt="Partners Background"
          className="w-full h-full object-cover object-center"
        />
        {/* Hero-style horizontal gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/40" />
        {/* Hero-style vertical gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
      </div>

      {/* Header */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-neutral-200 text-xs font-extrabold text-black uppercase tracking-widest shadow-md">
          <ShieldCheck className="w-4 h-4 text-black" />
          <span>Institutional Ecosystem</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight drop-shadow-lg">
          Our Trusted Industry Partners & Counterparties
        </h2>
        <p className="text-neutral-200 text-xs sm:text-sm max-w-2xl mx-auto drop-shadow-sm">
          Collaborating with premier regulatory bodies, trade finance institutions, refineries, and international commodity desks across Africa.
        </p>
      </div>

      {/* Marquee Container with Fade Overlay Edges */}
      <div className="relative z-10 w-full overflow-hidden py-4">
        {/* Left Fade Gradient Mask */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none" />
        {/* Right Fade Gradient Mask */}
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-black/40 via-black/30 to-transparent z-10 pointer-events-none" />

        {/* Moving Ticker Strip */}
        <div className="animate-marquee flex items-center gap-5">
          {marqueeItems.map((partner, index) => (
            <div
              key={`${partner.id}-${index}`}
              className="shrink-0 bg-black/80 backdrop-blur-md border border-white/20 hover:border-white/40 rounded-2xl px-5 py-4 w-64 sm:w-72 transition-all duration-300 group hover:scale-[1.02] shadow-xl cursor-pointer hover:bg-black/90"
            >
              <div className="flex items-center justify-between mb-2.5">
                <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0 group-hover:bg-white/20 transition-colors">
                  {getPartnerIcon(partner.iconName)}
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-300 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10">
                  {partner.location}
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="text-sm font-extrabold text-white group-hover:text-neutral-200 transition-colors truncate drop-shadow-sm">
                  {partner.name}
                </h3>
                <div className="flex items-center justify-between text-[11px] text-neutral-400 font-medium">
                  <span className="text-neutral-300 font-semibold">{partner.category}</span>
                  <span className="text-[10px] font-mono text-neutral-400">{partner.shortName}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
