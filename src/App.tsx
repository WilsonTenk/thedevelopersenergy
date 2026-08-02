import React, { useState, useEffect } from 'react';
import { PageTab, InsightArticle } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MarketTickerBar } from './components/MarketTickerBar';
import { HomeTab } from './components/HomeTab';
import { AboutTab } from './components/AboutTab';
import { ServicesTab } from './components/ServicesTab';
import { InsightsTab } from './components/InsightsTab';
import { BlogTab } from './components/BlogTab';
import { TrainingTab } from './components/TrainingTab';
import { ContactTab } from './components/ContactTab';
import { QuoteModal } from './components/QuoteModal';
import { TradeCalculatorModal } from './components/TradeCalculatorModal';

// Per-page SEO metadata — title & description update dynamically on tab change
const PAGE_META: Record<PageTab, { title: string; description: string }> = {
  home: {
    title: 'The Developers Energy Limited | Petroleum Trade & Energy Advisory — West Africa',
    description:
      'The Developers Energy Limited is a West African petroleum trade facilitation and energy advisory firm based in Accra, Ghana. Physical oil trading, NPA-aligned compliance, market intelligence, and infrastructure logistics.',
  },
  about: {
    title: 'About Us | The Developers Energy Limited — Accra, Ghana',
    description:
      'Learn about The Developers Energy Limited — our mission, leadership team, regulatory standing, and our role as a strategic bridge across the West African energy value chain.',
  },
  services: {
    title: 'Services | Petroleum Trade, Advisory & Infrastructure — The Developers Energy',
    description:
      'Explore our full service suite: physical petroleum trade facilitation, energy market intelligence, tank farm & terminal engineering, marine logistics, trade finance, and BDC support across West Africa.',
  },
  insights: {
    title: 'Market Insights | Energy & Petroleum Intelligence — The Developers Energy',
    description:
      'Stay ahead with The Developers Energy market intelligence reports — crude oil price analysis, refined product benchmarks, NPA regulatory updates, and West African energy market forecasts.',
  },
  blog: {
    title: 'Blog | Energy Sector Commentary & News — The Developers Energy',
    description:
      'Read expert commentary, sector news, and thought leadership from The Developers Energy team on petroleum trading, energy transition, BDC operations, and West African market dynamics.',
  },
  training: {
    title: 'Executive Training & Masterclasses | The Developers Energy Limited',
    description:
      'Build world-class energy expertise with The Developers Energy executive training programs — petroleum trading fundamentals, HSSE depot safety, risk derivatives, fuel station management, and BDC operations masterclasses in Accra.',
  },
  contact: {
    title: 'Contact Us | The Developers Energy Limited — Accra, Ghana',
    description:
      'Get in touch with The Developers Energy trade desk and advisory team. Reach us for petroleum deals, energy partnerships, infrastructure projects, training inquiries, or strategic capital discussions.',
  },
};

export default function App() {
  const [activeTab, setActiveTab] = useState<PageTab>('home');
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quotePrefilledService, setQuotePrefilledService] = useState<string | undefined>(undefined);
  const [calculatorModalOpen, setCalculatorModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<InsightArticle | null>(null);

  // Update document title + meta description on every tab change
  useEffect(() => {
    const meta = PAGE_META[activeTab];
    document.title = meta.title;
    const descEl = document.querySelector('meta[name="description"]');
    if (descEl) descEl.setAttribute('content', meta.description);
    window.scrollTo(0, 0);
  }, [activeTab]);

  const handleOpenQuoteModal = (serviceTitle?: string) => {
    setQuotePrefilledService(serviceTitle);
    setQuoteModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col font-sans selection:bg-black selection:text-white">
      {/* Sticky Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenQuoteModal={handleOpenQuoteModal}
        onOpenCalculator={() => setCalculatorModalOpen(true)}
      />

      {/* Live Energy Benchmarks Ticker Bar */}
      <MarketTickerBar onOpenCalculator={() => setCalculatorModalOpen(true)} />

      {/* Main Page Content based on Active Tab */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomeTab
            setActiveTab={setActiveTab}
            onOpenQuoteModal={handleOpenQuoteModal}
            onOpenCalculator={() => setCalculatorModalOpen(true)}
            onSelectArticle={(article) => {
              setSelectedArticle(article);
              setActiveTab('insights');
            }}
          />
        )}

        {activeTab === 'about' && (
          <AboutTab
            setActiveTab={setActiveTab}
            onOpenQuoteModal={handleOpenQuoteModal}
          />
        )}

        {activeTab === 'services' && (
          <ServicesTab
            onOpenQuoteModal={handleOpenQuoteModal}
            onOpenCalculator={() => setCalculatorModalOpen(true)}
          />
        )}

        {activeTab === 'insights' && (
          <InsightsTab
            selectedArticleProp={selectedArticle}
            onSelectArticle={(article) => setSelectedArticle(article)}
          />
        )}

        {activeTab === 'blog' && (
          <BlogTab
            onOpenQuoteModal={handleOpenQuoteModal}
          />
        )}

        {activeTab === 'training' && (
          <TrainingTab
            onOpenQuoteModal={handleOpenQuoteModal}
          />
        )}

        {activeTab === 'contact' && <ContactTab />}
      </main>

      {/* Site Footer */}
      <Footer
        setActiveTab={setActiveTab}
        onOpenQuoteModal={handleOpenQuoteModal}
      />

      {/* Interactive Modals */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        prefilledService={quotePrefilledService}
        onOpenCalculator={() => setCalculatorModalOpen(true)}
      />

      <TradeCalculatorModal
        isOpen={calculatorModalOpen}
        onClose={() => setCalculatorModalOpen(false)}
        onForwardQuote={handleOpenQuoteModal}
      />
    </div>
  );
}
