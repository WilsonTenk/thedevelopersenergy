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

export default function App() {
  const [activeTab, setActiveTab] = useState<PageTab>('home');
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quotePrefilledService, setQuotePrefilledService] = useState<string | undefined>(undefined);
  const [calculatorModalOpen, setCalculatorModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<InsightArticle | null>(null);

  // Automatically scroll to top of page whenever active tab changes or on initial load
  useEffect(() => {
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
