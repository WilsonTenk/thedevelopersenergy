import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Search, ArrowRight, MessageSquare, ShieldCheck, Zap } from 'lucide-react';

export interface FaqItem {
  id: string;
  category: 'Trade & Offtake' | 'Finance & LCs' | 'Regulatory & Compliance' | 'Terminal Logistics' | 'Training & Advisory';
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'Trade & Offtake',
    question: 'What petroleum products does The Developers Energy Limited handle?',
    answer: 'We facilitate physical commodity trading, off-take allocations, and cargo allocations for Refined Petroleum Products including Gasoil (10ppm & 50ppm Low-Sulfur Diesel), Premium Motor Spirit (Mogas / Gasoline), Aviation Jet Fuel (Jet A-1), Heavy Fuel Oil (HFO), Liquefied Petroleum Gas (LPG), and Crude Oil allocations.'
  },
  {
    id: 'faq-2',
    category: 'Finance & LCs',
    question: 'How do you support Bulk Distribution Companies (BDCs) with Letters of Credit (LCs)?',
    answer: 'We partner with Tier-1 international and regional trade finance banks to structure syndicated LC trade credit facilities, back-to-back LCs, and structured trade finance lines that protect BDC margins against foreign exchange (FX) fluctuations and credit liquidity constraints.'
  },
  {
    id: 'faq-3',
    category: 'Regulatory & Compliance',
    question: 'Are your operations fully compliant with the National Petroleum Authority (NPA)?',
    answer: 'Yes. All transactions, off-take agreements, and depot allocations arranged by The Developers Energy Limited strictly comply with National Petroleum Authority (NPA) regulations, Customs Division guidelines, and international sanctions/compliance screening standards in Ghana and West Africa.'
  },
  {
    id: 'faq-4',
    category: 'Terminal Logistics',
    question: 'Where are your primary port and terminal operations located?',
    answer: 'Our main logistics hubs are centered at the Tema Deepwater Port Corridor and Takoradi Port in Ghana, alongside strategic depot linkages in Nigeria, Côte d’Ivoire, and major international hubs in London and Geneva.'
  },
  {
    id: 'faq-5',
    category: 'Terminal Logistics',
    question: 'How do you prevent vessel demurrage during Ship-to-Ship (STS) transfers?',
    answer: 'Our marine logistics desk is led by licensed Master Mariners who coordinate pre-berth clearance, marine draft surveys, mooring protocols, and dedicated STS transfer windows. This rigorous operational control has maintained a zero-demurrage record across 45+ consecutive vessel discharges.'
  },
  {
    id: 'faq-6',
    category: 'Trade & Offtake',
    question: 'What is the minimum cargo order quantity for bulk fuel orders?',
    answer: 'We accommodate both full cargo vessel allocations (10,000 MT to 50,000+ MT) for deepwater tankers and spot/contractual bonded depot allocations (500 MT to 5,000 MT) for regional Bulk Distribution Companies and industrial off-takers.'
  },
  {
    id: 'faq-7',
    category: 'Training & Advisory',
    question: 'What executive training programs do you offer for petroleum sector professionals?',
    answer: 'Through our Executive Energy Training Institute, we conduct certified masterclasses covering Incoterms 2020 in Energy Trading, Ex-Refinery Price Risk Hedging, Terminal HSE & Metering SCADA Systems, and Downstream Demurrage Management.'
  },
  {
    id: 'faq-8',
    category: 'Regulatory & Compliance',
    question: 'How can a potential partner or client initiate a trade consultation?',
    answer: 'You can request a direct trade desk consultation by using our "Request Trade Quotation" button, calling our Accra headquarters (+233 246470010), or submitting an inquiry directly through our secure platform contact form.'
  }
];

interface FaqSectionProps {
  onOpenConsultation: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenConsultation }) => {
  const [openId, setOpenId] = useState<string | null>('faq-1');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Trade & Offtake', 'Finance & LCs', 'Regulatory & Compliance', 'Terminal Logistics', 'Training & Advisory'];

  const filteredFaqs = FAQ_ITEMS.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleAccordion = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black text-white text-xs font-extrabold uppercase tracking-widest">
            <HelpCircle className="w-4 h-4 text-white" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-black tracking-tight">
            Client Knowledge Base & Trade FAQs
          </h2>
          <p className="text-neutral-600 text-sm leading-relaxed">
            Quick answers regarding our physical oil trading procedures, trade finance support, regulatory compliance, and terminal off-take operations.
          </p>
        </div>

        {/* Quick Contact Badge */}
        <div className="bg-neutral-100 border border-neutral-200 rounded-2xl p-4 shrink-0 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center shrink-0">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div className="space-y-0.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block">Have specific trade terms?</span>
            <button
              onClick={onOpenConsultation}
              className="text-xs font-extrabold text-black hover:underline flex items-center gap-1"
            >
              <span>Speak directly to Trade Desk</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-neutral-50 p-3 sm:p-4 rounded-2xl border border-neutral-200">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-black text-white shadow-sm'
                  : 'bg-white text-neutral-700 hover:bg-neutral-200 border border-neutral-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input Box */}
        <div className="relative w-full sm:w-72 shrink-0">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search FAQs (e.g. LC, NPA, STS)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-neutral-200 text-xs text-black placeholder-neutral-400 focus:outline-none focus:border-black font-medium"
          />
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {filteredFaqs.length === 0 ? (
          <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-8 text-center space-y-2">
            <p className="text-sm font-bold text-black">No matching questions found.</p>
            <p className="text-xs text-neutral-500">Try adjusting your search filter or category selection.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-2 text-xs font-extrabold text-black underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`border rounded-2xl transition-all duration-200 overflow-hidden ${
                  isOpen ? 'bg-black text-white border-black shadow-lg' : 'bg-neutral-50 text-black border-neutral-200 hover:border-neutral-400'
                }`}
              >
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider shrink-0 ${
                        isOpen ? 'bg-neutral-800 text-neutral-300' : 'bg-neutral-200 text-neutral-800'
                      }`}
                    >
                      {faq.category}
                    </span>
                    <h3 className={`text-sm sm:text-base font-bold leading-snug ${isOpen ? 'text-white' : 'text-black'}`}>
                      {faq.question}
                    </h3>
                  </div>

                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? 'bg-white text-black rotate-180' : 'bg-neutral-200 text-black'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-neutral-800/80 mt-1">
                    <p className="pt-3">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Bottom CTA Box */}
      <div className="bg-neutral-900 text-white border border-neutral-800 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="text-base sm:text-lg font-extrabold text-white">Still have questions about our energy services?</h4>
          <p className="text-xs text-neutral-400">Our physical oil trading advisors are available to review your cargo specifications and trade credit requirements.</p>
        </div>

        <button
          onClick={onOpenConsultation}
          className="px-6 py-3 rounded-full bg-white text-black hover:bg-neutral-200 text-xs font-extrabold uppercase tracking-wider transition-colors shrink-0 flex items-center gap-2 shadow-md"
        >
          <span>Submit Inquiry to Trade Desk</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
