import React, { useState } from 'react';
import { PageTab } from '../types';
import { SITE_IMAGES } from '../data/imageData';
import { Menu, X, ArrowUpRight, Shield, MapPin, Mail, Phone, Calculator } from 'lucide-react';

interface HeaderProps {
  activeTab: PageTab;
  setActiveTab: (tab: PageTab) => void;
  onOpenQuoteModal: (service?: string) => void;
  onOpenCalculator: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenQuoteModal,
  onOpenCalculator,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: PageTab; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'services', label: 'Services' },
    { id: 'insights', label: 'Insights' },
    { id: 'blog', label: 'Blog' },
    { id: 'training', label: 'Training' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (tab: PageTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-neutral-200 shadow-sm">
      {/* Top bar */}
      <div className="bg-neutral-950 text-neutral-300 text-xs border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-6 text-xs text-neutral-300">
            <span className="flex items-center gap-1.5 hover:text-white transition-colors">
              <MapPin className="w-3.5 h-3.5 text-neutral-400" />
              Accra, Ghana
            </span>
            <span className="hidden sm:flex items-center gap-1.5 hover:text-white transition-colors">
              <Mail className="w-3.5 h-3.5 text-neutral-400" />
              info@developersenergy.com
            </span>
            <span className="hidden md:flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone className="w-3.5 h-3.5 text-neutral-400" />
              +233 30 200 8890
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={onOpenCalculator}
              className="flex items-center gap-1.5 text-xs text-white bg-neutral-800 hover:bg-neutral-700 px-2.5 py-1 rounded border border-neutral-700 transition-all font-medium"
            >
              <Calculator className="w-3.5 h-3.5 text-neutral-300" />
              <span>Trade Estimator</span>
            </button>
            <span className="text-neutral-700 hidden sm:inline">|</span>
            <span className="text-[11px] text-neutral-300 font-mono hidden sm:inline-flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              LATEST MARKET WINDOW: ACTIVE
            </span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between min-h-[92px] py-2">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center text-left group focus:outline-none py-1"
          >
            <img
              src={SITE_IMAGES.logoHeader}
              alt="The Developers Energy Logo"
              className="h-20 sm:h-24 max-h-24 w-auto object-contain transition-transform group-hover:scale-105 duration-200"
            />
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center space-x-1 bg-neutral-100 p-1.5 rounded-full border border-neutral-200">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-150 uppercase tracking-wider ${
                    isActive
                      ? 'text-white bg-black shadow-md'
                      : 'text-neutral-700 hover:text-black hover:bg-neutral-200/80'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center space-x-3">
            <button
              onClick={() => onOpenQuoteModal()}
              className="relative inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider text-white bg-black hover:bg-neutral-800 shadow-md transition-all active:scale-[0.98]"
            >
              <span>Consult Trade Desk</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={() => onOpenQuoteModal()}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-black rounded"
            >
              Quote
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-neutral-700 hover:text-black hover:bg-neutral-100 border border-neutral-300"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-neutral-200 px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top duration-200">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                  isActive
                    ? 'text-white bg-black'
                    : 'text-neutral-800 hover:bg-neutral-100'
                }`}
              >
                {item.label}
              </button>
            );
          })}
          <div className="pt-4 border-t border-neutral-200 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCalculator();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-neutral-100 border border-neutral-300 text-black text-sm font-semibold hover:bg-neutral-200"
            >
              <Calculator className="w-4 h-4" />
              <span>Launch B2B Trade Estimator</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuoteModal();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-black text-white text-sm font-semibold hover:bg-neutral-800"
            >
              <span>Consult Trade Desk</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
