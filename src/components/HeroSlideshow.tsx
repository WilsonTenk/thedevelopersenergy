import React, { useState, useEffect } from 'react';
import { SITE_IMAGES } from '../data/imageData';
import { PageTab } from '../types';
import {
  ArrowUpRight,
  BarChart3,
  ChevronRight,
  ChevronLeft,
  Pause,
  Play,
  Flame,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

interface HeroSlideshowProps {
  setActiveTab: (tab: PageTab) => void;
  onOpenQuoteModal: (service?: string) => void;
  onOpenCalculator: () => void;
}

export const HeroSlideshow: React.FC<HeroSlideshowProps> = ({
  setActiveTab,
  onOpenQuoteModal,
  onOpenCalculator,
}) => {
  const slides = SITE_IMAGES.heroSlides;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [isPaused, slides.length]);

  const activeSlide = slides[currentSlide];

  return (
    <section className="relative w-full min-h-[580px] lg:min-h-[640px] bg-black rounded-3xl overflow-hidden border border-neutral-300 shadow-xl group my-2">
      {/* BACKGROUND SLIDESHOW WITH SMOOTH CROSSFADE */}
      {slides.map((slide, idx) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentSlide ? 'opacity-100 z-0' : 'opacity-0 -z-10'
          }`}
        >
          <img
            src={slide.url}
            alt={slide.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center scale-105 group-hover:scale-100 transition-transform duration-10000 ease-linear"
          />
        </div>
      ))}

      {/* MULTI-STAGE FADED GRADIENT OVERLAYS FOR CRISP TYPOGRAPHY */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 lg:via-black/75 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 z-10 pointer-events-none" />

      {/* CONTENT LAYOUT */}
      <div className="relative z-20 h-full w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-12 lg:py-16 flex flex-col justify-between space-y-8">
        
        {/* Top bar info */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-neutral-200 text-xs font-extrabold text-black uppercase tracking-widest shadow-md">
            <Flame className="w-3.5 h-3.5 text-black" />
            <span>{activeSlide.tag}</span>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-xs text-neutral-300 font-mono bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-neutral-700">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>NPA LICENSED ENERGY DESK</span>
          </div>
        </div>

        {/* Dynamic Main Typography Block */}
        <div className="max-w-2xl space-y-5 my-auto">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.12]">
            {activeSlide.title}
          </h1>

          <p className="text-neutral-200 text-sm sm:text-base leading-relaxed max-w-xl font-normal drop-shadow-sm">
            {activeSlide.subtitle}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onOpenQuoteModal()}
              className="px-7 py-3.5 rounded-full text-xs font-extrabold uppercase tracking-wider text-black bg-white hover:bg-neutral-200 shadow-xl transition-all active:scale-95 flex items-center gap-2"
            >
              <span>Consult Trade Desk</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenCalculator}
              className="px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-black/80 backdrop-blur-md border border-white/30 hover:bg-black transition-all flex items-center gap-2"
            >
              <BarChart3 className="w-4 h-4 text-white" />
              <span>B2B Cargo Estimator</span>
            </button>
          </div>
        </div>

        {/* Bottom Bar: Slide Controls & Slide Indicators */}
        <div className="pt-6 border-t border-white/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Slide Indicator Buttons */}
          <div className="flex items-center space-x-3">
            {slides.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => setCurrentSlide(idx)}
                className={`transition-all ${
                  idx === currentSlide
                    ? 'w-10 h-2.5 rounded-full bg-white'
                    : 'w-2.5 h-2.5 rounded-full bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}

            <button
              onClick={() => setIsPaused(!isPaused)}
              className="ml-3 p-1.5 rounded-full bg-black/60 hover:bg-black text-white border border-white/20 transition-colors"
              title={isPaused ? 'Play slideshow' : 'Pause slideshow'}
            >
              {isPaused ? <Play className="w-3.5 h-3.5 text-white" /> : <Pause className="w-3.5 h-3.5 text-neutral-300" />}
            </button>
          </div>

          {/* Previous / Next Arrows */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
              className="p-2.5 rounded-full bg-black/70 backdrop-blur-md border border-white/20 hover:border-white text-white transition-all hover:scale-105"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
              className="p-2.5 rounded-full bg-black/70 backdrop-blur-md border border-white/20 hover:border-white text-white transition-all hover:scale-105"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
