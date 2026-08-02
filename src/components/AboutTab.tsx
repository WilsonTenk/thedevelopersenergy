import React, { useState, useRef } from 'react';
import { PageTab } from '../types';
import { STRATEGIC_TRACKS, SUPPORT_VECTORS, COMPANY_PROFILE_DATA } from '../data/energyData';
import { EXECUTIVE_LEADERBOARD, LeaderboardExecutive, MilestoneLeaderboardItem } from '../data/leaderboardData';
import { SITE_IMAGES } from '../data/imageData';
import { HorizontalImageBanner } from './HorizontalImageBanner';
import { LeaderboardModal } from './LeaderboardModal';
import {
  Eye,
  Target,
  ShieldCheck,
  Building2,
  Compass,
  Globe2,
  Users,
  Coins,
  Wrench,
  FileCheck,
  Lightbulb,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Trophy,
  Award,
  Crown,
  Medal,
  Activity,
  Briefcase,
  Layers,
  TrendingUp,
  MapPin,
  Check,
  Mail,
  Phone,
  Linkedin,
  Twitter,
  ExternalLink,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

interface AboutTabProps {
  setActiveTab: (tab: PageTab) => void;
  onOpenQuoteModal: (service?: string) => void;
}

export const AboutTab: React.FC<AboutTabProps> = ({ setActiveTab, onOpenQuoteModal }) => {
  const [selectedTrack, setSelectedTrack] = useState<string>(STRATEGIC_TRACKS[0].id);
  
  // Slider state for Governance & Domain Capability
  const capabilitySliderRef = useRef<HTMLDivElement>(null);
  const [activeCapabilityIndex, setActiveCapabilityIndex] = useState(0);

  const scrollCapability = (direction: 'left' | 'right') => {
    if (capabilitySliderRef.current) {
      const cardWidth = capabilitySliderRef.current.firstElementChild?.getBoundingClientRect().width || 320;
      const gap = 20;
      const scrollAmount = (cardWidth + gap) * (direction === 'left' ? -1 : 1);
      capabilitySliderRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const handleCapabilityScroll = () => {
    if (capabilitySliderRef.current) {
      const { scrollLeft } = capabilitySliderRef.current;
      const cardWidth = capabilitySliderRef.current.firstElementChild?.getBoundingClientRect().width || 320;
      const gap = 20;
      const index = Math.round(scrollLeft / (cardWidth + gap));
      setActiveCapabilityIndex(Math.min(Math.max(0, index), SUPPORT_VECTORS.length - 1));
    }
  };

  const scrollToCapabilityIndex = (index: number) => {
    if (capabilitySliderRef.current) {
      const cardWidth = capabilitySliderRef.current.firstElementChild?.getBoundingClientRect().width || 320;
      const gap = 20;
      capabilitySliderRef.current.scrollTo({
        left: index * (cardWidth + gap),
        behavior: 'smooth',
      });
      setActiveCapabilityIndex(index);
    }
  };
  
  // Modal states for leaderboard executive details
  const [selectedExecutive, setSelectedExecutive] = useState<LeaderboardExecutive | null>(null);
  const [selectedMilestone, setSelectedMilestone] = useState<MilestoneLeaderboardItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenExecutive = (exec: LeaderboardExecutive) => {
    setSelectedExecutive(exec);
    setSelectedMilestone(null);
    setIsModalOpen(true);
  };

  const handleOpenMilestone = (item: MilestoneLeaderboardItem) => {
    setSelectedMilestone(item);
    setSelectedExecutive(null);
    setIsModalOpen(true);
  };

  const getVectorIcon = (iconName: string) => {
    switch (iconName) {
      case 'Users':
        return <Users className="w-5 h-5 text-black" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-black" />;
      case 'Coins':
        return <Coins className="w-5 h-5 text-black" />;
      case 'Wrench':
        return <Wrench className="w-5 h-5 text-black" />;
      case 'FileCheck':
        return <FileCheck className="w-5 h-5 text-black" />;
      case 'Lightbulb':
        return <Lightbulb className="w-5 h-5 text-black" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-black" />;
    }
  };

  const currentTrack = STRATEGIC_TRACKS.find((t) => t.id === selectedTrack) || STRATEGIC_TRACKS[0];

  return (
    <div className="space-y-16 pb-20 bg-white">
      {/* PAGE HEADER */}
      <section className="bg-white py-14 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-white bg-black px-3.5 py-1.5 rounded-full inline-block">
              Company Profile 2026
            </span>
            <span className="text-xs font-semibold text-neutral-600 bg-neutral-100 px-3 py-1 rounded-full">
              {COMPANY_PROFILE_DATA.tagline}
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-black tracking-tight leading-tight">
            {COMPANY_PROFILE_DATA.name}
          </h1>
          <p className="text-neutral-700 text-base sm:text-lg max-w-4xl leading-relaxed">
            An emerging energy and commodity services company focused on creating sustainable value across Africa’s evolving energy landscape through market intelligence, commercial advisory, brokerage support, and strategic partnerships.
          </p>
        </div>
      </section>

      {/* CORPORATE OVERVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-neutral-50 rounded-3xl p-8 sm:p-12 border border-neutral-200 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center font-bold">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-black">Company Overview</h2>
              <span className="text-xs text-neutral-500 font-medium">Africa Energy & Commodity Services</span>
            </div>
          </div>

          <div className="text-neutral-700 text-sm sm:text-base leading-relaxed space-y-4">
            <p>
              {COMPANY_PROFILE_DATA.overview.split('\n\n')[0]}
            </p>
            <p>
              {COMPANY_PROFILE_DATA.overview.split('\n\n')[1]}
            </p>
            <p>
              {COMPANY_PROFILE_DATA.overview.split('\n\n')[2]}
            </p>
          </div>
        </div>
      </section>

      {/* VISION & MISSION BENTO CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Vision Card */}
          <div className="bg-neutral-50 border border-neutral-200 rounded-3xl p-8 sm:p-10 relative overflow-hidden space-y-5 hover:border-black transition-all">
            <div className="w-12 h-12 rounded-2xl bg-white border border-neutral-300 flex items-center justify-center text-black">
              <Eye className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-extrabold text-white bg-black uppercase tracking-widest px-3 py-1 rounded-full inline-block">
              Our Vision
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-black leading-snug">
              Leading African Energy Solutions
            </h2>
            <p className="text-neutral-700 text-sm sm:text-base leading-relaxed">
              "{COMPANY_PROFILE_DATA.vision}"
            </p>
            <ul className="space-y-2.5 text-xs text-neutral-700 pt-4 border-t border-neutral-200">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-black shrink-0" />
                <span>Excellence in energy intelligence & market analysis</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-black shrink-0" />
                <span>Driving economic growth & regional energy security</span>
              </li>
            </ul>
          </div>

          {/* Mission Card */}
          <div className="bg-neutral-50 border border-neutral-200 rounded-3xl p-8 sm:p-10 relative overflow-hidden space-y-5 hover:border-black transition-all">
            <div className="w-12 h-12 rounded-2xl bg-white border border-neutral-300 flex items-center justify-center text-black">
              <Target className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-extrabold text-white bg-black uppercase tracking-widest px-3 py-1 rounded-full inline-block">
              Our Mission
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-black leading-snug">
              Enabling Informed Energy Participation
            </h2>
            <p className="text-neutral-700 text-sm sm:text-base leading-relaxed">
              "{COMPANY_PROFILE_DATA.mission}"
            </p>
            <ul className="space-y-2.5 text-xs text-neutral-700 pt-4 border-t border-neutral-200">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-black shrink-0" />
                <span>Reliable advisory & commercial execution support</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-black shrink-0" />
                <span>Unlocking commercial opportunities in African markets</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CORE VALUES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-white bg-black px-3.5 py-1.5 rounded-full inline-block">
            Foundational Pillars
          </span>
          <h2 className="text-3xl font-extrabold text-black tracking-tight mt-2">
            Our Core Values
          </h2>
          <p className="text-neutral-600 text-sm">
            Five principles guiding every partnership, deal structure, and strategic advisory assignment we execute.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {COMPANY_PROFILE_DATA.coreValues.map((val, idx) => (
            <div
              key={idx}
              className="bg-neutral-50 border border-neutral-200 rounded-3xl p-6 space-y-3 hover:border-black transition-all"
            >
              <div className="w-9 h-9 rounded-xl bg-black text-white flex items-center justify-center text-xs font-mono font-bold">
                0{idx + 1}
              </div>
              <h3 className="text-base font-extrabold text-black">{val.title}</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">{val.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TARGET MARKETS & COMPETITIVE ADVANTAGE */}
      <section className="bg-neutral-50 py-16 border-y border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Target Markets */}
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-white bg-black px-3 py-1 rounded-full inline-block">
                  Geographic Footprint
                </span>
                <h2 className="text-3xl font-extrabold text-black tracking-tight mt-2">
                  Target Markets
                </h2>
              </div>
              <p className="text-xs text-neutral-600 max-w-xl">
                Strategically positioned in Ghana to support regional integration across West Africa and continental expansion.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {COMPANY_PROFILE_DATA.targetMarkets.map((m, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-neutral-200 rounded-3xl p-7 space-y-3 shadow-sm hover:border-black transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-extrabold text-black flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-black" />
                      {m.name}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-black text-white px-2.5 py-1 rounded-full">
                      {m.scope}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    {m.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Competitive Advantage */}
          <div className="space-y-6 pt-6 border-t border-neutral-200">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-white bg-black px-3 py-1 rounded-full inline-block">
                Why TDE
              </span>
              <h2 className="text-3xl font-extrabold text-black tracking-tight mt-2">
                Our Competitive Advantage
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {COMPANY_PROFILE_DATA.competitiveAdvantages.map((adv) => (
                <div
                  key={adv.id}
                  className="bg-white border border-neutral-200 rounded-3xl p-6 space-y-3 shadow-sm hover:border-black transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-neutral-100 border border-neutral-300 flex items-center justify-center text-black font-bold">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-extrabold text-black">{adv.title}</h3>
                  <p className="text-xs text-neutral-600 leading-relaxed">{adv.description}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* COMMERCIAL ENGAGEMENT MODELS & GROWTH STRATEGY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Commercial Engagement Models */}
          <div className="lg:col-span-6 bg-neutral-50 rounded-3xl p-8 border border-neutral-200 space-y-6 shadow-sm">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-white bg-black px-3 py-1 rounded-full inline-block mb-2">
                Commercial Architecture
              </span>
              <h2 className="text-2xl font-extrabold text-black">
                Business & Engagement Models
              </h2>
              <p className="text-xs text-neutral-600 mt-1">
                Flexible commercial frameworks tailored to client requirements and deal structures.
              </p>
            </div>

            <div className="space-y-3">
              {COMPANY_PROFILE_DATA.engagementModels.map((em, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white border border-neutral-200 flex items-start gap-3.5"
                >
                  <div className="w-7 h-7 rounded-lg bg-black text-white flex items-center justify-center shrink-0 text-xs font-bold font-mono">
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-black">{em.title}</h3>
                    <p className="text-xs text-neutral-600">{em.purpose}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image Holder with smooth fading & blending into clean layout space */}
          <div className="lg:col-span-6 relative rounded-3xl overflow-hidden min-h-[420px] border border-neutral-200 shadow-md group flex flex-col justify-between bg-neutral-100">
            {/* Background Image */}
            <img
              src={SITE_IMAGES.heroSlides[1].url}
              alt="West Africa Strategic Energy Logistics & Terminal Infrastructure"
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />

            {/* Gradient Mask / Fading Overlays that seamlessly blend image into surrounding light layout */}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-900/40 to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/20 via-transparent to-neutral-900/20 z-10" />

            {/* Top Floating Badge & Icon */}
            <div className="relative z-20 p-6 flex items-center justify-between">
              <span className="px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-black text-[10px] font-extrabold uppercase tracking-widest border border-white/60 shadow-sm">
                Strategic Infrastructure
              </span>
              <div className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-sm">
                <Globe2 className="w-4 h-4" />
              </div>
            </div>

            {/* Bottom Floating Card Overlay with Glassmorphism Accent */}
            <div className="relative z-20 p-6 sm:p-8 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-400/30 text-emerald-300 text-[11px] font-mono font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Pan-African Energy Corridors</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-snug">
                Connecting Refineries, Terminals & Regional Markets
              </h3>
              <p className="text-xs sm:text-sm text-neutral-200 max-w-lg leading-relaxed">
                Positioned strategically across West African energy hubs to deliver zero-demurrage vessel off-loading, bonded depot allocations, and structured commodity trade execution.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* GOVERNANCE & DOMAIN CAPABILITY SLIDER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-white bg-black px-3 py-1 rounded-full inline-block">
              Governance & Domain Capability
            </span>
            <h2 className="text-3xl font-extrabold text-black tracking-tight mt-2">
              Management & Strategic Vectors
            </h2>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={() => scrollCapability('left')}
              aria-label="Previous capability vector"
              className="w-10 h-10 rounded-full border border-neutral-300 hover:border-black bg-white hover:bg-neutral-100 text-black flex items-center justify-center transition-all shadow-sm active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollCapability('right')}
              aria-label="Next capability vector"
              className="w-10 h-10 rounded-full border border-neutral-300 hover:border-black bg-white hover:bg-neutral-100 text-black flex items-center justify-center transition-all shadow-sm active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Swipeable & Scrollable Capability Vector Track */}
        <div
          ref={capabilitySliderRef}
          onScroll={handleCapabilityScroll}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-none scroll-smooth py-2 px-1 focus:outline-none"
        >
          {SUPPORT_VECTORS.map((vector, idx) => (
            <div
              key={vector.id}
              className="w-[85%] sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] shrink-0 snap-start bg-neutral-50 border border-neutral-200 hover:border-black rounded-3xl p-6 sm:p-7 flex flex-col justify-between hover:shadow-xl transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-11 h-11 rounded-2xl bg-white border border-neutral-300 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors shadow-sm">
                    {getVectorIcon(vector.iconName)}
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-neutral-200/80 text-neutral-800 px-2.5 py-1 rounded-md">
                    0{idx + 1} / 0{SUPPORT_VECTORS.length}
                  </span>
                </div>

                <h3 className="text-lg font-extrabold text-black mb-2 leading-snug group-hover:text-neutral-900">
                  {vector.title}
                </h3>

                <p className="text-xs text-neutral-600 leading-relaxed mb-6">
                  {vector.description}
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-200 flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold uppercase text-neutral-500">
                  TDE Core Vector
                </span>
                <button
                  onClick={() => onOpenQuoteModal(`Advisory on ${vector.title}`)}
                  className="text-xs text-black hover:text-neutral-600 font-extrabold flex items-center gap-1 group-hover:underline"
                >
                  <span>Inquire</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Dot Navigation */}
        <div className="flex items-center justify-center gap-2 pt-2">
          {SUPPORT_VECTORS.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToCapabilityIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeCapabilityIndex === index
                  ? 'w-8 bg-black'
                  : 'w-2 bg-neutral-300 hover:bg-neutral-400'
              }`}
            />
          ))}
        </div>
      </section>

      {/* 1440px x 500px HORIZONTAL IMAGE HOLDER */}
      <HorizontalImageBanner
        imageUrl={SITE_IMAGES.horizontalBanners.aboutLeaderboard}
        badgeText="INSTITUTIONAL GOVERNANCE & LEADERSHIP"
        title="Anchored by Experienced Energy & Trade Executives"
        subtitle="Bringing together extensive expertise across physical petroleum trading, international trade finance, marine terminal logistics, and African energy law."
        stats={[
          { label: 'Executive Directorate', value: '4 Senior' },
          { label: 'Combined Track Record', value: '60+ Years' },
          { label: 'Regulatory Alignment', value: '100% Compliant' },
        ]}
        ctaText="Meet Executive Directorate"
        onCtaClick={() => {
          const el = document.getElementById('executive-directorate-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* EXECUTIVE DIRECTORATE SECTION */}
      <section id="executive-directorate-section" className="bg-neutral-900 text-white py-16 border-y border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-black text-xs font-extrabold uppercase tracking-widest">
              <Trophy className="w-4 h-4" />
              <span>West Africa Energy Executive Directorate</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Executive Directorate
            </h2>
            <p className="text-neutral-400 text-sm">
              Recognizing our senior executive directors, trade leads, and sector advisors driving regional growth.
            </p>
          </div>

          {/* EXECUTIVE LEADERBOARD CARDS */}
          <div className="space-y-5 max-w-5xl mx-auto">
            {EXECUTIVE_LEADERBOARD.map((exec) => {
              return (
                <div
                  key={exec.rank}
                  onClick={() => handleOpenExecutive(exec)}
                  className="bg-black border border-neutral-800 hover:border-neutral-500 rounded-3xl p-6 sm:p-7 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl cursor-pointer group"
                >
                  <div className="flex items-start gap-4 sm:gap-5">
                    {/* Photo Avatar / Empty Image Holder */}
                    <div className="relative shrink-0">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-neutral-700 group-hover:border-white bg-neutral-800 transition-colors shadow-md flex items-center justify-center">
                        {exec.imageUrl ? (
                          <img
                            src={exec.imageUrl}
                            alt={exec.name}
                            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-neutral-800 via-neutral-900 to-black text-white p-2 text-center">
                            <span className="text-sm sm:text-base font-extrabold tracking-widest font-mono text-neutral-200">
                              {exec.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                            </span>
                            <span className="text-[7px] font-mono text-neutral-400 mt-0.5 uppercase tracking-tighter">
                              Director
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="absolute -bottom-2 -right-2 bg-neutral-900 border border-neutral-700 rounded-lg px-2 py-0.5 text-[10px] font-mono font-bold text-white shadow-sm">
                        #{exec.rank}
                      </div>
                    </div>

                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg sm:text-xl font-extrabold text-white group-hover:text-neutral-200 transition-colors flex items-center gap-2">
                          <span>{exec.name}</span>
                          <ChevronRight className="w-4 h-4 text-neutral-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                        </h3>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border border-neutral-700 bg-neutral-900 text-neutral-300 flex items-center gap-1 font-mono">
                          <Crown className="w-3 h-3 text-amber-400" />
                          <span>{exec.division}</span>
                        </span>
                      </div>

                      <p className="text-xs text-neutral-300 font-bold uppercase tracking-wide">
                        {exec.role}
                      </p>

                      <p className="text-xs text-neutral-400 max-w-2xl leading-relaxed line-clamp-2">
                        {exec.bioSummary}
                      </p>

                      {/* Social Badges & Specialty Tags */}
                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        {exec.linkedinUrl && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-400 bg-blue-950/40 border border-blue-800/40 px-2 py-0.5 rounded-md">
                            <Linkedin className="w-3 h-3" />
                            <span>LinkedIn</span>
                          </span>
                        )}
                        {exec.twitterUrl && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-neutral-300 bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded-md">
                            <Twitter className="w-3 h-3" />
                            <span>Twitter</span>
                          </span>
                        )}
                        {exec.specialty.map((tag, idx) => (
                          <span key={idx} className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-md bg-neutral-900 border border-neutral-800 text-neutral-400">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Metrics block */}
                  <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-4 md:w-60 shrink-0 space-y-1.5 text-left group-hover:bg-neutral-900 transition-colors">
                    <div className="flex items-center justify-between text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                      <span>Track Record</span>
                      <span className="text-white font-mono">Profile &gt;</span>
                    </div>
                    <div className="text-base font-extrabold text-white font-mono">
                      {exec.dealVolumeMetric}
                    </div>
                    <div className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{exec.reliabilityScore}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Leaderboard Detail Modal */}
      <LeaderboardModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        executive={selectedExecutive}
        milestone={selectedMilestone}
        onContactExecutive={(name) => onOpenQuoteModal(`Direct Inquiry for ${name}`)}
      />

      {/* PARTNERSHIP APPROACH & CONTACT CALLOUT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="bg-neutral-50 border border-neutral-200 rounded-3xl p-8 sm:p-12 space-y-8 shadow-sm">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-white bg-black px-3.5 py-1.5 rounded-full inline-block">
              Strategic Collaboration
            </span>
            <h2 className="text-3xl font-extrabold text-black tracking-tight mt-2">
              Our Partnership Approach
            </h2>
            <p className="text-neutral-600 text-sm">
              We believe sustainable growth is achieved through strong relationships, transparent execution, and mutual commercial benefit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-sm font-extrabold text-black uppercase tracking-wider">Who We Collaborate With</h3>
              <ul className="space-y-2.5 text-xs text-neutral-700">
                {COMPANY_PROFILE_DATA.partnershipApproach.collaborators.map((c, i) => (
                  <li key={i} className="flex items-start gap-2.5 bg-white p-3 rounded-xl border border-neutral-200">
                    <CheckCircle2 className="w-4 h-4 text-black shrink-0 mt-0.5" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-extrabold text-black uppercase tracking-wider">Partnership Principles</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {COMPANY_PROFILE_DATA.partnershipApproach.pillars.map((p, i) => (
                  <div key={i} className="bg-white p-4 rounded-xl border border-neutral-200 text-xs font-bold text-black flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-black shrink-0" />
                    <span>{p}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bento Callout box */}
        <div className="bg-black text-white rounded-3xl p-8 sm:p-10 text-center space-y-4 max-w-4xl mx-auto border border-neutral-800 shadow-xl">
          <h3 className="text-2xl font-extrabold text-white">
            Developing Energy Opportunities. Creating Sustainable Value.
          </h3>
          <p className="text-neutral-300 text-sm max-w-2xl mx-auto">
            For partnerships, investment opportunities, energy advisory services, and commercial collaborations, reach out to our executive desk.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onOpenQuoteModal('Strategic Partnership')}
              className="px-7 py-3.5 rounded-full text-xs font-extrabold uppercase tracking-wider text-black bg-white hover:bg-neutral-200 transition-colors inline-flex items-center gap-2 shadow-lg"
            >
              <span>Contact Executive Desk</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="tel:+233246470010"
              className="px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-neutral-900 border border-neutral-700 hover:bg-neutral-800 inline-flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>+233 246470010</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};


