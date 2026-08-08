import React from 'react';
import { PageTab } from '../types';
import { SITE_IMAGES } from '../data/imageData';
import { Mail, Phone, MapPin, ArrowRight, ShieldCheck, Globe, Linkedin, Twitter, Facebook } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: PageTab) => void;
  onOpenQuoteModal: (service?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onOpenQuoteModal }) => {
  const handleTabClick = (tab: PageTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black text-neutral-400 border-t border-neutral-800">
      {/* Upper footer CTA strip */}
      <div className="border-b border-neutral-800 bg-neutral-950 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="inline-block text-xs uppercase tracking-widest text-white font-bold mb-2">
              Strategic Energy Partnerships
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Looking to Trade, Partner, or Invest in West Africa?
            </h3>
            <p className="text-neutral-400 text-sm mt-1 max-w-2xl">
              Connect with our trade desk and advisory team to discuss petroleum deals, infrastructure projects, or strategic capital alliances.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => onOpenQuoteModal()}
              className="px-6 py-3 rounded-full bg-white text-black font-extrabold text-sm hover:bg-neutral-200 transition-all shadow-lg flex items-center gap-2"
            >
              <span>Get in Touch</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleTabClick('insights')}
              className="px-5 py-3 rounded-full bg-neutral-900 border border-neutral-700 text-white hover:bg-neutral-800 text-sm font-semibold transition-colors"
            >
              View Market Insights
            </button>
          </div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <img
              src={SITE_IMAGES.logoColor}
              alt="The Developers Energy Logo"
              className="h-24 sm:h-28 max-h-32 w-auto object-contain"
            />

            <p className="text-sm text-neutral-400 leading-relaxed max-w-sm">
              A strategic bridge across the energy value chain. Facilitating physical petroleum trades, providing high-precision market intelligence, supporting infrastructure assets, and empowering human capital.
            </p>

            <div className="pt-2 flex items-center space-x-3 text-neutral-400 text-sm">
              <span className="px-2.5 py-1 rounded-full bg-neutral-900 border border-neutral-700 text-xs text-white font-medium flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Ghana NPA Aligned
              </span>
              <span className="px-2.5 py-1 rounded-full bg-neutral-900 border border-neutral-700 text-xs text-neutral-300 font-medium flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-sky-400" />
                West Africa & Global
              </span>
            </div>

            <div className="pt-2 flex items-center space-x-3">
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-600 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-600 transition-colors"
                aria-label="X / Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-600 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-slate-200 font-bold mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm">
              {['home', 'about', 'services', 'insights', 'blog', 'training', 'contact'].map((t) => (
                <li key={t}>
                  <button
                    onClick={() => handleTabClick(t as PageTab)}
                    className="hover:text-white transition-colors capitalize text-left"
                  >
                    {t === 'about' ? 'About Us' : t === 'home' ? 'Overview' : t}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-slate-200 font-bold mb-4">
              Core Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => {
                    handleTabClick('services');
                  }}
                  className="hover:text-white transition-colors text-left"
                >
                  Energy Trade Facilitation
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    handleTabClick('services');
                  }}
                  className="hover:text-white transition-colors text-left"
                >
                  Market Intelligence
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    handleTabClick('services');
                  }}
                  className="hover:text-white transition-colors text-left"
                >
                  Infrastructure & Engineering
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    handleTabClick('training');
                  }}
                  className="hover:text-white transition-colors text-left"
                >
                  Training & Masterclasses
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    handleTabClick('about');
                  }}
                  className="hover:text-white transition-colors text-left"
                >
                  BDC & Upstream Tracks
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact info */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-slate-200 font-bold mb-4">
              Accra Headquarters
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-white shrink-0 mt-1" />
                <span>Accra, Ghana &bull; West Africa</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-white shrink-0" />
                <span className="text-white font-semibold">+233 246470010</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-white shrink-0" />
                <span className="text-slate-300">info@developersenergy.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[#161a24] flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div>
            &copy; {new Date().getFullYear()} The Developers Energy Limited. All rights reserved.
          </div>
          <div className="flex items-center space-x-6">
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-slate-300">
              Privacy Policy
            </a>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-slate-300">
              Terms of Business
            </a>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-slate-300">
              HSSE Compliance
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
