import React, { useState, useRef } from 'react';
import { PageTab, InsightArticle } from '../types';
import { CORE_SERVICES, INSIGHT_ARTICLES } from '../data/energyData';
import { SITE_IMAGES } from '../data/imageData';
import { HeroSlideshow } from './HeroSlideshow';
import { PartnersMarquee } from './PartnersMarquee';
import { FaqSection } from './FaqSection';
import {
  ArrowRight,
  ShieldCheck,
  Truck,
  TrendingUp,
  Factory,
  GraduationCap,
  Building2,
  Globe2,
  Compass,
  ChevronLeft,
  ChevronRight,
  Zap,
  BarChart3,
  Flame,
  FileText,
  Lock,
  Anchor,
  Sparkles,
  ArrowUpRight,
  Activity,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

interface HomeTabProps {
  setActiveTab: (tab: PageTab) => void;
  onOpenQuoteModal: (service?: string) => void;
  onOpenCalculator: () => void;
  onSelectArticle: (article: InsightArticle) => void;
}

export const HomeTab: React.FC<HomeTabProps> = ({
  setActiveTab,
  onOpenQuoteModal,
  onOpenCalculator,
  onSelectArticle,
}) => {
  const serviceSliderRef = useRef<HTMLDivElement>(null);
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);

  const scrollServices = (direction: 'left' | 'right') => {
    if (serviceSliderRef.current) {
      const cardWidth = serviceSliderRef.current.firstElementChild?.getBoundingClientRect().width || 320;
      const gap = 20; // 5 * 4px gap
      const scrollAmount = (cardWidth + gap) * (direction === 'left' ? -1 : 1);
      serviceSliderRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const handleServicesScroll = () => {
    if (serviceSliderRef.current) {
      const { scrollLeft } = serviceSliderRef.current;
      const cardWidth = serviceSliderRef.current.firstElementChild?.getBoundingClientRect().width || 320;
      const gap = 20;
      const index = Math.round(scrollLeft / (cardWidth + gap));
      setActiveServiceIndex(Math.min(Math.max(0, index), CORE_SERVICES.length - 1));
    }
  };

  const scrollToIndex = (index: number) => {
    if (serviceSliderRef.current) {
      const cardWidth = serviceSliderRef.current.firstElementChild?.getBoundingClientRect().width || 320;
      const gap = 20;
      serviceSliderRef.current.scrollTo({
        left: index * (cardWidth + gap),
        behavior: 'smooth',
      });
      setActiveServiceIndex(index);
    }
  };

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Building2':
        return <Building2 className="w-5 h-5 text-black" />;
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5 text-black" />;
      case 'Truck':
        return <Truck className="w-5 h-5 text-black" />;
      case 'Factory':
        return <Factory className="w-5 h-5 text-black" />;
      case 'Globe2':
        return <Globe2 className="w-5 h-5 text-black" />;
      case 'GraduationCap':
        return <GraduationCap className="w-5 h-5 text-black" />;
      case 'Compass':
        return <Compass className="w-5 h-5 text-black" />;
      default:
        return <Zap className="w-5 h-5 text-black" />;
    }
  };

  return (
    <div className="space-y-16 pb-20 bg-white">
      {/* HERO SLIDESHOW SECTION WITH FADED TYPOGRAPHY SIDE */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <HeroSlideshow
          setActiveTab={setActiveTab}
          onOpenQuoteModal={onOpenQuoteModal}
          onOpenCalculator={onOpenCalculator}
        />
      </div>

      {/* CORE OPERATIONS SLIDER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-white bg-black px-3 py-1 rounded-full inline-block">
              Core Business Areas
            </span>
            <h2 className="text-3xl font-extrabold text-black tracking-tight mt-3">
              Official Service Catalogue
            </h2>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
            {/* Slider Arrow Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollServices('left')}
                aria-label="Previous core service"
                className="w-10 h-10 rounded-full border border-neutral-300 hover:border-black bg-white hover:bg-neutral-100 text-black flex items-center justify-center transition-all shadow-sm active:scale-95"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollServices('right')}
                aria-label="Next core service"
                className="w-10 h-10 rounded-full border border-neutral-300 hover:border-black bg-white hover:bg-neutral-100 text-black flex items-center justify-center transition-all shadow-sm active:scale-95"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <button
              onClick={() => setActiveTab('services')}
              className="text-xs font-bold text-black hover:text-neutral-600 flex items-center gap-1 uppercase tracking-wider bg-neutral-100 hover:bg-neutral-200 px-4 py-2.5 rounded-full transition-colors ml-2"
            >
              <span>View Full Scope</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Swipeable & Scrollable Slider Track */}
        <div
          ref={serviceSliderRef}
          onScroll={handleServicesScroll}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-none scroll-smooth py-2 px-1 focus:outline-none"
        >
          {CORE_SERVICES.map((service, idx) => (
            <div
              key={service.id}
              className="w-[85%] sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] shrink-0 snap-start bg-neutral-50 border border-neutral-200 hover:border-black rounded-3xl p-6 sm:p-7 flex flex-col justify-between hover:shadow-xl transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-11 h-11 rounded-2xl bg-white border border-neutral-300 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors shadow-sm">
                    {getServiceIcon(service.iconName)}
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-neutral-200/80 text-neutral-800 px-2.5 py-1 rounded-md">
                    0{idx + 1} / 0{CORE_SERVICES.length}
                  </span>
                </div>

                <h3 className="text-lg font-extrabold text-black mb-2 leading-snug group-hover:text-neutral-900">
                  {service.title}
                </h3>

                <p className="text-xs text-neutral-600 leading-relaxed mb-6 line-clamp-3">
                  {service.description}
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-200 flex items-center justify-between">
                <button
                  onClick={() => onOpenQuoteModal(service.title)}
                  className="text-xs font-bold text-black hover:text-neutral-600 flex items-center gap-1 uppercase tracking-wider"
                >
                  <span>Inquire</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => setActiveTab(service.id === 'training' ? 'training' : 'services')}
                  className="text-xs text-neutral-500 hover:text-black font-semibold flex items-center gap-1 group-hover:underline"
                >
                  <span>Learn More</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Dot Navigation / Progress Indicators */}
        <div className="flex items-center justify-center gap-2 pt-2">
          {CORE_SERVICES.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeServiceIndex === index
                  ? 'w-8 bg-black'
                  : 'w-2 bg-neutral-300 hover:bg-neutral-400'
              }`}
            />
          ))}
        </div>
      </section>

      {/* WHY THE DEVELOPERS ENERGY (CLEAN BENTO HIGHLIGHTS) */}
      <section className="bg-neutral-900 py-16 text-white border-y border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-black bg-white px-3 py-1 rounded-full inline-block">
              Institutional Advantage
            </span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight mt-2">
              Why Partner With The Developers Energy
            </h2>
            <p className="text-neutral-400 text-xs sm:text-sm">
              Combining international supply networks with local regulatory mastery across Ghana's petroleum market.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-black border border-neutral-800 rounded-3xl p-7 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-700 flex items-center justify-center text-white">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-extrabold text-white">Bankable Deal Structuring</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Irrevocable Letters of Credit (LCs), trade finance advisory, and NPA compliance clearances that de-risk cross-border oil shipments.
              </p>
            </div>

            <div className="bg-black border border-neutral-800 rounded-3xl p-7 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-700 flex items-center justify-center text-white">
                <Truck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-extrabold text-white">Physical Cargo Execution</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Direct cargo off-taking for Crude, Gasoil 10ppm, Unleaded Gasoline, and ATK with verified berth access and zero-demurrage records.
              </p>
            </div>

            <div className="bg-black border border-neutral-800 rounded-3xl p-7 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-700 flex items-center justify-center text-white">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-extrabold text-white">Precision Intelligence</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Daily Platts-aligned price monitoring, FX risk advisory, and regulatory intelligence for BDCs, OMCs, and institutional buyers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TRUSTED PARTNERS CONTINUOUS MARQUEE TICKER */}
      <PartnersMarquee />

      {/* FEATURED INSIGHTS SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-white bg-black px-3 py-1 rounded-full inline-block">
              Market Intelligence
            </span>
            <h2 className="text-3xl font-extrabold text-black tracking-tight mt-3">
              Latest Market Briefings
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('insights')}
            className="text-xs font-bold text-black hover:text-neutral-600 flex items-center gap-1 shrink-0 uppercase tracking-wider"
          >
            <span>Explore All Insights</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {INSIGHT_ARTICLES.slice(0, 2).map((article) => (
            <div
              key={article.id}
              onClick={() => onSelectArticle(article)}
              className="bg-neutral-50 border border-neutral-200 rounded-3xl p-7 hover:border-black transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-neutral-500 mb-3">
                  <span className="px-3 py-1 rounded-full text-[10px] font-extrabold bg-black text-white uppercase tracking-wider">
                    {article.category}
                  </span>
                  <span className="font-mono text-[11px] text-neutral-600">{article.date}</span>
                </div>

                <h3 className="text-lg font-bold text-black group-hover:text-neutral-700 transition-colors mb-2 leading-snug">
                  {article.title}
                </h3>

                <p className="text-xs text-neutral-600 leading-relaxed mb-4 line-clamp-2">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-3 border-t border-neutral-200 flex items-center justify-between text-xs font-extrabold text-black uppercase tracking-wider">
                <span className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Read Report
                </span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS SECTION */}
      <FaqSection onOpenConsultation={() => onOpenQuoteModal('FAQ Trade Consultation')} />

      {/* FINAL HIGH-IMPACT BENTO CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-black text-white rounded-3xl p-8 sm:p-12 text-center space-y-5 max-w-4xl mx-auto shadow-2xl relative overflow-hidden border border-neutral-800">
          <div className="space-y-2 relative z-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Ready to Structure Your Next Cargo Deal?
            </h2>
            <p className="text-neutral-300 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
              Connect with our physical energy desk in Accra to discuss cargo allocations, Letters of Credit, or terminal discharge operations.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 relative z-10">
            <button
              onClick={() => onOpenQuoteModal()}
              className="px-8 py-3.5 rounded-full text-xs font-extrabold uppercase tracking-wider text-black bg-white hover:bg-neutral-200 shadow-xl flex items-center gap-2"
            >
              <span>Consult Trade Desk</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenCalculator}
              className="px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-neutral-900 border border-neutral-700 hover:bg-neutral-800"
            >
              Cargo Estimator Tool
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
