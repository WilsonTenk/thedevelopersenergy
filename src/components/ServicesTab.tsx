import React, { useState } from 'react';
import { CORE_SERVICES } from '../data/energyData';
import { SITE_IMAGES } from '../data/imageData';
import { HorizontalImageBanner } from './HorizontalImageBanner';
import {
  Truck,
  TrendingUp,
  Factory,
  GraduationCap,
  Building2,
  Globe2,
  Compass,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  FileCheck,
  Users,
  Flame
} from 'lucide-react';

interface ServicesTabProps {
  onOpenQuoteModal: (serviceTitle?: string) => void;
  onOpenCalculator: () => void;
}

export const ServicesTab: React.FC<ServicesTabProps> = ({ onOpenQuoteModal, onOpenCalculator }) => {
  const [activeServiceId, setActiveServiceId] = useState<string>(CORE_SERVICES[0].id);
  const [activeWorkflowStep, setActiveWorkflowStep] = useState<number>(1);

  const activeService = CORE_SERVICES.find((s) => s.id === activeServiceId) || CORE_SERVICES[0];

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Building2':
        return <Building2 className="w-6 h-6 text-black" />;
      case 'TrendingUp':
        return <TrendingUp className="w-6 h-6 text-black" />;
      case 'Truck':
        return <Truck className="w-6 h-6 text-black" />;
      case 'Factory':
        return <Factory className="w-6 h-6 text-black" />;
      case 'Globe2':
        return <Globe2 className="w-6 h-6 text-black" />;
      case 'GraduationCap':
        return <GraduationCap className="w-6 h-6 text-black" />;
      case 'Compass':
        return <Compass className="w-6 h-6 text-black" />;
      default:
        return <Zap className="w-6 h-6 text-black" />;
    }
  };

  const workflowSteps = [
    {
      step: 1,
      title: 'Producers & Refiners',
      role: 'Upstream & Supply Origination',
      description: 'Securing cargo allocations for Crude Oil, Gasoil 10ppm, Unleaded Gasoline, and ATK from international refiners and trading houses.',
      deliverables: ['Cargo Availability Verification', 'Quality & FOB Specs Audit', 'Vessel Chartering']
    },
    {
      step: 2,
      title: 'The Developers Energy',
      role: 'Strategic Trade & Advisory Bridge',
      description: 'Structuring Letters of Credit (LCs), handling NPA regulatory clearances, arranging STS operations, and ensuring zero-demurrage logistics.',
      deliverables: ['Confirmed Irrevocable LC', 'NPA Discharge Authorization', 'Risk & FX Hedging']
    },
    {
      step: 3,
      title: 'BDCs, OMCs & Industrial End-Users',
      role: 'Wholesale & Terminal Discharge',
      description: 'Delivering refined petroleum products into Tema & Takoradi storage tanks or directly off-taking to mining and commercial fleet buyers.',
      deliverables: ['Bonded Terminal Stock Release', 'Quality Certificate Clearance', 'Downstream Distribution']
    }
  ];

  return (
    <div className="space-y-16 pb-20 bg-white">
      {/* PAGE HEADER */}
      <section className="bg-white py-14 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-xs font-extrabold uppercase tracking-widest text-white bg-black px-3.5 py-1.5 rounded-full inline-block">
            What We Do
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-black tracking-tight">
            Our Scope of Operations
          </h1>
          <p className="text-neutral-600 text-base sm:text-lg max-w-3xl leading-relaxed">
            Four core service lines supporting the energy value chain—from deal structuring and market intelligence to engineering assets and workforce training.
          </p>
        </div>
      </section>

      {/* SERVICE BENTO NAV TABS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CORE_SERVICES.map((s) => {
            const isActive = activeServiceId === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setActiveServiceId(s.id)}
                className={`p-6 rounded-3xl text-left border transition-all flex items-start space-x-4 ${
                  isActive
                    ? 'bg-black text-white border-black shadow-xl'
                    : 'bg-neutral-50 border-neutral-200 hover:border-black text-neutral-600'
                }`}
              >
                <div
                  className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${
                    isActive ? 'bg-white text-black' : 'bg-neutral-200 text-black'
                  }`}
                >
                  {getServiceIcon(s.iconName)}
                </div>
                <div>
                  <h3 className={`text-base font-extrabold ${isActive ? 'text-white' : 'text-black'}`}>
                    {s.title}
                  </h3>
                  <span className={`text-xs block mt-0.5 line-clamp-1 ${isActive ? 'text-neutral-300' : 'text-neutral-500'}`}>
                    {s.subtitle}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* ACTIVE SERVICE DETAILED BENTO DISPLAY */}
        <div className="mt-8 bg-neutral-50 rounded-3xl p-8 lg:p-10 border border-neutral-200 space-y-8 shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-neutral-200">
            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-black flex items-center justify-center text-white">
                  {getServiceIcon(activeService.iconName)}
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-black">
                    {activeService.title}
                  </h2>
                  <p className="text-xs text-black font-extrabold tracking-wide uppercase">
                    {activeService.subtitle}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {activeService.id === 'trade-facilitation' && (
                <button
                  onClick={onOpenCalculator}
                  className="px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-black bg-white border border-neutral-300 hover:bg-neutral-100 transition-all"
                >
                  Estimate Cargo Value
                </button>
              )}
              <button
                onClick={() => onOpenQuoteModal(activeService.title)}
                className="px-6 py-3 rounded-full text-xs font-extrabold uppercase tracking-wider text-white bg-black hover:bg-neutral-800 transition-colors shadow-lg flex items-center gap-2"
              >
                <span>Consult on {activeService.title}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <p className="text-neutral-700 text-base leading-relaxed max-w-4xl">
            {activeService.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Highlights & Scope */}
            <div className="space-y-4 bg-white p-6 rounded-2xl border border-neutral-200">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-black flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Operational Scope & Capabilities
              </h3>
              <ul className="space-y-2.5 text-xs text-neutral-800">
                {activeService.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-black shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Deliverables */}
            <div className="space-y-4 bg-white p-6 rounded-2xl border border-neutral-200">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-black flex items-center gap-2">
                <FileCheck className="w-4 h-4" />
                Key Client Deliverables
              </h3>
              <ul className="space-y-2.5 text-xs text-neutral-800">
                {activeService.deliverableList.map((d, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-black shrink-0 mt-0.5" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Target Audience */}
          <div className="pt-4 border-t border-neutral-200">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-neutral-500 mb-3 flex items-center gap-2">
              <Users className="w-4 h-4 text-black" />
              Target Client Segments:
            </h4>
            <div className="flex flex-wrap gap-2">
              {activeService.targetAudience.map((target, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-white border border-neutral-300 text-black"
                >
                  {target}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STRATEGIC VALUE BRIDGE WORKFLOW */}
      <section className="bg-neutral-50 py-16 border-y border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-white bg-black px-3 py-1 rounded-full inline-block">
              The Execution Bridge
            </span>
            <h2 className="text-3xl font-extrabold text-black tracking-tight mt-2">
              Value Chain Intermediary Workflow
            </h2>
            <p className="text-neutral-600 text-sm">
              How The Developers Energy Limited operates as a trusted execution partner between upstream refiners, international traders, and downstream end-users.
            </p>
          </div>

          {/* Workflow Step Bento Tabs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {workflowSteps.map((w) => {
              const isActive = activeWorkflowStep === w.step;
              return (
                <button
                  key={w.step}
                  onClick={() => setActiveWorkflowStep(w.step)}
                  className={`p-6 rounded-2xl text-left border transition-all duration-200 ${
                    isActive
                      ? 'bg-black text-white border-black shadow-xl'
                      : 'bg-white border-neutral-200 hover:border-black text-neutral-600'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`text-[10px] font-mono font-bold px-3 py-1 rounded-full uppercase tracking-widest ${
                        isActive ? 'bg-white text-black' : 'bg-neutral-200 text-black'
                      }`}
                    >
                      STAGE 0{w.step}
                    </span>
                    <span className={`text-[11px] font-semibold ${isActive ? 'text-neutral-300' : 'text-neutral-500'}`}>{w.role}</span>
                  </div>
                  <h3 className={`text-lg font-extrabold ${isActive ? 'text-white' : 'text-black'}`}>
                    {w.title}
                  </h3>
                </button>
              );
            })}
          </div>

          {/* Active Workflow Bento Detail Card */}
          {workflowSteps.find((w) => w.step === activeWorkflowStep) && (
            <div className="bg-white border border-neutral-200 rounded-3xl p-8 sm:p-10 shadow-xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 space-y-5">
                  <div className="text-xs text-black font-extrabold uppercase tracking-widest">
                    Stage Execution Scope &bull; {workflowSteps[activeWorkflowStep - 1].role}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-black">
                    {workflowSteps[activeWorkflowStep - 1].title}
                  </h3>
                  <p className="text-neutral-600 text-sm leading-relaxed">
                    {workflowSteps[activeWorkflowStep - 1].description}
                  </p>

                  <div className="pt-2">
                    <h4 className="text-xs font-bold text-neutral-700 uppercase tracking-wider mb-3">
                      Stage Deliverables:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {workflowSteps[activeWorkflowStep - 1].deliverables.map((d, i) => (
                        <div
                          key={i}
                          className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs font-medium text-black flex items-center gap-2"
                        >
                          <CheckCircle2 className="w-4 h-4 text-black shrink-0" />
                          <span>{d}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4 bg-black text-white p-6 rounded-2xl border border-neutral-800 space-y-4 text-center">
                  <Flame className="w-10 h-10 text-white mx-auto animate-pulse" />
                  <h4 className="text-base font-bold text-white">Need Advisory at this Stage?</h4>
                  <p className="text-xs text-neutral-300">
                    Our trade desk assists with deal structuring, LC issuance, and NPA clearances.
                  </p>
                  <button
                    onClick={() => onOpenQuoteModal(workflowSteps[activeWorkflowStep - 1].title)}
                    className="w-full py-3 rounded-full text-xs font-extrabold text-black bg-white hover:bg-neutral-200 transition-colors uppercase tracking-wider shadow-lg"
                  >
                    Discuss Stage {activeWorkflowStep} Deal
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* REFINERY & LOGISTICS 1440px x 500px HORIZONTAL IMAGE HOLDER */}
      <HorizontalImageBanner
        imageUrl={SITE_IMAGES.horizontalBanners.servicesOperations}
        badgeText="DOWNSTREAM INFRASTRUCTURE & ASSETS"
        title="Engineering Advisory for Tank Farms, Pipelines & Stations"
        subtitle="Conducting site feasibility, EPA/NPA regulatory filings, and CAPEX feasibility models for petroleum storage asset owners across West Africa."
        stats={[
          { label: 'Feasibility Audits', value: '280+' },
          { label: 'Storage Managed', value: '450k m³' },
          { label: 'EPA Compliance', value: '100%' },
        ]}
        ctaText="Schedule Infrastructure Audit"
        onCtaClick={() => onOpenQuoteModal('Infrastructure Advisory')}
      />
    </div>
  );
};
