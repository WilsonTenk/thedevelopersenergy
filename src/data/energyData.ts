import { MarketRate, ServiceItem, StrategicTrack, InsightArticle, TrainingCourse, SupportVector } from '../types';

export const MARKET_RATES: MarketRate[] = [
  {
    id: 'brent',
    symbol: 'BRENT',
    label: 'Brent Crude Oil',
    price: 82.45,
    change: 1.12,
    changePct: 1.37,
    unit: 'USD/bbl',
    category: 'crude',
    lastUpdated: '10 mins ago'
  },
  {
    id: 'gasoil',
    symbol: 'GASOIL-10',
    label: 'Gasoil 10ppm (WAF)',
    price: 768.50,
    change: -4.20,
    changePct: -0.54,
    unit: 'USD/MT',
    category: 'refined',
    lastUpdated: '15 mins ago'
  },
  {
    id: 'gasoline',
    symbol: 'MOGAS-95',
    label: 'Unleaded Gasoline 95',
    price: 812.30,
    change: 6.80,
    changePct: 0.84,
    unit: 'USD/MT',
    category: 'refined',
    lastUpdated: '12 mins ago'
  },
  {
    id: 'usdghs',
    symbol: 'USD/GHS',
    label: 'USD to Ghana Cedi',
    price: 15.28,
    change: -0.04,
    changePct: -0.26,
    unit: 'GHS',
    category: 'forex',
    lastUpdated: '5 mins ago'
  },
  {
    id: 'wti',
    symbol: 'WTI',
    label: 'WTI Crude Oil',
    price: 78.60,
    change: 0.95,
    changePct: 1.22,
    unit: 'USD/bbl',
    category: 'crude',
    lastUpdated: '10 mins ago'
  },
  {
    id: 'freight',
    symbol: 'ARA-WAF',
    label: 'MR Tanker Freight (ARA-WAF)',
    price: 38.20,
    change: 0.40,
    changePct: 1.05,
    unit: 'USD/MT',
    category: 'freight',
    lastUpdated: '1 hour ago'
  }
];

export const CORE_SERVICES: ServiceItem[] = [
  {
    id: 'energy-advisory',
    title: 'Energy Advisory & Consulting',
    iconName: 'Building2',
    subtitle: 'Strategic Guidance for Energy Opportunities in Africa',
    description: 'We provide strategic advisory support to companies, investors, and institutions seeking opportunities within the energy sector. We combine deep industry knowledge, research, and commercial expertise to guide critical investments and market entries.',
    highlights: [
      'Energy Market Assessments & Sector Feasibility',
      'Petroleum Sector Strategic Advisory',
      'Commercial Strategy & Business Expansion Advisory',
      'Investment Opportunity Analysis & Project Evaluation'
    ],
    deliverableList: [
      'Comprehensive Market Feasibility Briefs',
      'Commercial Strategy Development Dossiers',
      'Risk Mitigation & Due Diligence Reports',
      'Investment Appraisal & CAPEX Engineering Models'
    ],
    targetAudience: [
      'Energy Companies & Refiners',
      'Institutional Investors & Private Equity',
      'Financial Institutions & Banks',
      'Government Energy Agencies & Regulators'
    ],
    badge: 'Core Service'
  },
  {
    id: 'market-intelligence',
    title: 'Energy Market Intelligence',
    iconName: 'TrendingUp',
    subtitle: 'Data-Driven Insights for Strategic Decisions',
    description: 'The Developers Energy Limited provides timely, data-driven insights into energy markets to support sound business decisions. We track pricing, supply/demand balances, regulatory changes, and regional market trends across West Africa.',
    highlights: [
      'Petroleum Market & Price Analysis (Platts / Argus / NPA)',
      'Supply and Demand Assessments across West Africa',
      'Regional Energy Market Studies & Trend Forecasts',
      'Competitive Intelligence & Regulatory Monitoring'
    ],
    deliverableList: [
      'Customized Executive Intelligence Bulletins',
      'Price Window Formula & Ex-Refinery Parity Analysis',
      'Regional Fuel Flow & Storage Balance Reports',
      'Policy, Policy Watch & Regulatory Clearance Reviews'
    ],
    targetAudience: [
      'Commercial Trade Desks',
      'Bulk Distribution Companies (BDCs)',
      'Trading Companies & Financial Lenders',
      'Government Agencies & Policy Makers'
    ],
    badge: 'Real-Time Insights'
  },
  {
    id: 'trade-facilitation',
    title: 'Commodity Brokerage & Trade Facilitation',
    iconName: 'Truck',
    subtitle: 'Connecting Verified Buyers & Sellers of Energy Commodities',
    description: 'We facilitate connections between qualified buyers, sellers, and strategic partners within the energy value chain. We structure, coordinate, and support end-to-end commodity transactions with high commercial discipline.',
    highlights: [
      'Buyer & Seller Identification & Structured Introductions',
      'Transaction Coordination & Commercial Negotiations Support',
      'Deal Structuring Assistance & Due Diligence Coordination',
      'Focus Commodities: Crude Oil, Diesel (AGO), Gasoline (PMS), LPG, ATK'
    ],
    deliverableList: [
      'Verified Counterparty Identification Matrix',
      'Term Sheet & SPA Commercial Structuring',
      'Documentation & Letter of Credit (LC) Support',
      'Due Diligence & Transaction Clearance Files'
    ],
    targetAudience: [
      'Crude Oil & Refined Product Producers',
      'International Commodity Traders',
      'Bulk Distribution Companies (BDCs)',
      'Industrial Off-Takers & Mining Consortia'
    ],
    badge: 'Brokerage & Facilitation'
  },
  {
    id: 'supply-chain',
    title: 'Energy Supply Chain & Commercial Support',
    iconName: 'Factory',
    subtitle: 'Efficient Product Access & Distribution Support',
    description: 'We support organizations involved in energy distribution, logistics, and trading by securing reliable product supply, entry into new regional markets, and optimizing supply chain operations.',
    highlights: [
      'Supplier Sourcing & Distribution Partnership Development',
      'Market Entry Support & Commercial Representation',
      'Logistics Coordination & Tank Storage Offtake Advisory',
      'Contract Structuring & Risk Management Support'
    ],
    deliverableList: [
      'Supplier Audit & Verification Reports',
      'Distribution Channel & Depot Offtake Plans',
      'Logistics & Vessel Laycan Coordination Briefs',
      'Commercial Representation Agreements'
    ],
    targetAudience: [
      'Oil Marketing Companies (OMCs)',
      'Depot & Storage Asset Operators',
      'Logistics & Marine Fleet Operators',
      'Industrial Fuel Consumers'
    ]
  },
  {
    id: 'strategic-partnerships',
    title: 'Strategic Partnerships & Business Development',
    iconName: 'Globe2',
    subtitle: 'Building Value-Driven Partnerships Across Africa',
    description: 'We help organizations identify, build, and execute valuable partnerships between African businesses and global energy stakeholders, fostering shared value creation and sustainable growth.',
    highlights: [
      'Partnership Identification & Stakeholder Engagement',
      'Market Expansion Support across Ghana & West Africa',
      'Local Market Representation & Alliance Building',
      'Joint Venture & Business Opportunity Development'
    ],
    deliverableList: [
      'Partner Matching & Alignment Dossiers',
      'Joint Venture Structuring Frameworks',
      'Local Content & Regulatory Alignment Briefs',
      'Commercial MOU & Partnership Agreements'
    ],
    targetAudience: [
      'Global Energy Companies Seeking African Access',
      'Local Energy Businesses & Consortiums',
      'Institutional Investors & Development Partners',
      'Public-Private Partnership (PPP) Desks'
    ]
  },
  {
    id: 'training',
    title: 'Energy Training & Professional Development',
    iconName: 'GraduationCap',
    subtitle: 'Knowledge Solutions for Energy Professionals & Teams',
    description: 'We provide specialized, knowledge-based solutions aimed at developing energy professionals and corporate teams across trading, economics, petroleum value chain, and safety standards.',
    highlights: [
      'Energy Trading Fundamentals & Commodity Markets',
      'Petroleum Value Chain & International Energy Trade Education',
      'Energy Economics, Market Research & Risk Management',
      'HSSE Excellence & Petroleum Handling Safety Standards'
    ],
    deliverableList: [
      'Tailored In-House Corporate Training Curriculums',
      'Interactive Trading Simulation & Case Workshops',
      'Certified Professional Competency Assessment Briefs',
      'Post-Course Executive Mentorship & Reference Kits'
    ],
    targetAudience: [
      'Trade Operations Personnel & Risk Officers',
      'HSSE Officers & Fuel Terminal Managers',
      'Energy Banking Credit Risk Analysts',
      'Government Energy Regulators & Policymakers'
    ],
    badge: 'Professional Certification'
  },
  {
    id: 'research-publications',
    title: 'Research & Publications',
    iconName: 'Compass',
    subtitle: 'Specialized Market Intelligence Products & Reports',
    description: 'The Company develops high-value research products, energy market outlooks, and opportunity reports that empower executives, traders, and investors with competitive market analysis.',
    highlights: [
      'Energy Sector Reports & Market Outlook Publications',
      'Commodity Insights & Price Benchmark Bulletins',
      'Industry Briefings on Policy, Supply & Demand Shift',
      'Business Opportunity Reports in African Energy Markets'
    ],
    deliverableList: [
      'Quarterly African Energy Market Outlooks',
      'Executive Briefings on Petroleum Policy',
      'Custom Commodity Research & Pricing Models',
      'Market Opportunity Identification Reports'
    ],
    targetAudience: [
      'C-Suite Executives & Board Members',
      'Strategy & Business Development Desks',
      'Investment Analysts & Fund Managers',
      'Research & Policy Institutions'
    ]
  }
];

export const COMPANY_PROFILE_DATA = {
  name: 'THE DEVELOPERS ENERGY LIMITED',
  shortName: 'TDE',
  year: '2026',
  tagline: 'Developing Energy Opportunities. Creating Sustainable Value.',
  overview:
    'The Developers Energy Limited is an emerging energy and commodity services company focused on creating value across Africa’s evolving energy landscape. The company provides energy market intelligence, commercial advisory, brokerage support, trade facilitation, and strategic business solutions within the oil & gas, petroleum products, power, and emerging energy sectors.\n\nThrough industry knowledge, market analysis, and strategic partnerships, The Developers Energy Limited connects businesses, investors, suppliers, and energy stakeholders to unlock commercial opportunities and improve efficiency across the energy value chain.\n\nThe company is committed to supporting Africa’s energy growth by facilitating responsible trade, enhancing market access, and promoting sustainable energy development.',
  vision:
    'To become a leading African energy solutions company, recognized for excellence in energy intelligence, commodity trading support, and strategic partnerships that drive economic growth and energy security.',
  mission:
    'To provide reliable energy advisory, market intelligence, and commercial solutions that enable businesses and governments to make informed decisions, access opportunities, and participate effectively in Africa’s energy markets.',
  coreValues: [
    {
      title: 'Integrity',
      description: 'We conduct business with transparency, accountability, and professionalism.'
    },
    {
      title: 'Excellence',
      description: 'We pursue high standards in every service we provide.'
    },
    {
      title: 'Innovation',
      description: 'We leverage data, technology, and market insights to create better solutions.'
    },
    {
      title: 'Partnership',
      description: 'We believe sustainable growth is achieved through strong relationships and collaboration.'
    },
    {
      title: 'Sustainability',
      description: 'We support responsible energy development that considers economic and environmental impact.'
    }
  ],
  competitiveAdvantages: [
    {
      id: 'market-understanding',
      title: 'Market Understanding',
      description: 'Strong understanding of African energy markets and commercial realities.'
    },
    {
      id: 'strategic-networks',
      title: 'Strategic Networks',
      description: 'Building relationships with industry stakeholders, suppliers, buyers, and investors.'
    },
    {
      id: 'commercial-approach',
      title: 'Commercial Approach',
      description: 'Focused on identifying opportunities and creating mutually beneficial partnerships.'
    },
    {
      id: 'data-driven',
      title: 'Data-Driven Decisions',
      description: 'Using research and market intelligence to support better business decisions.'
    }
  ],
  targetMarkets: [
    {
      name: 'Ghana',
      scope: 'Local Focus',
      description: 'Supporting local energy businesses, distributors, investors, and industrial consumers.'
    },
    {
      name: 'West Africa',
      scope: 'Regional Integration',
      description: 'Connecting regional energy markets through partnerships and trade facilitation.'
    },
    {
      name: 'Africa',
      scope: 'Continental Horizon',
      description: 'Supporting Africa’s growing demand for reliable energy solutions and investment.'
    }
  ],
  engagementModels: [
    {
      title: 'Advisory Fees',
      purpose: 'For consulting and research assignments.'
    },
    {
      title: 'Brokerage Commissions',
      purpose: 'For successfully facilitated transactions.'
    },
    {
      title: 'Retainer Agreements',
      purpose: 'For ongoing advisory and intelligence services.'
    },
    {
      title: 'Partnership Agreements',
      purpose: 'For strategic commercial collaborations.'
    },
    {
      title: 'Project Development Support',
      purpose: 'Supporting long-term energy project execution and investment.'
    }
  ],
  growthStrategy: {
    shortTerm: [
      'Establishing energy advisory and brokerage operations',
      'Developing industry partnerships',
      'Building market intelligence capabilities'
    ],
    mediumTerm: [
      'Expanding regional operations across West Africa',
      'Developing commodity trading relationships',
      'Providing specialized energy consulting services'
    ],
    longTerm: [
      'Becoming a recognized African energy trading and advisory firm',
      'Participating in regional energy projects and investments'
    ]
  },
  managementExpertise: [
    {
      area: 'a) Energy & Petroleum Operations',
      desc: 'Understanding of petroleum downstream operations, fuel distribution, retail operations, supply chain management, and industry dynamics.'
    },
    {
      area: 'b) International Trade & Commodity Markets',
      desc: 'Knowledge of global trade practices, commodity flows, cross-border transactions, trade finance principles, and commercial negotiations.'
    },
    {
      area: 'c) Market Intelligence & Research',
      desc: 'Ability to analyze market trends, identify opportunities, assess risks, and provide strategic insights to support informed decision-making.'
    },
    {
      area: 'd) Business Development & Strategic Partnerships',
      desc: 'Experience in building relationships, developing commercial opportunities, and connecting stakeholders across different sectors and markets.'
    },
    {
      area: 'e) Corporate Governance & Professional Standards',
      desc: 'Commitment to ethical business practices, compliance, transparency, and responsible corporate management.'
    }
  ],
  partnershipApproach: {
    collaborators: [
      'Energy Companies (Producers, suppliers, distributors, and service providers)',
      'Investors & Financial Partners (Connecting investors with viable energy opportunities)',
      'Government & Institutions (Market insights supporting energy development)',
      'Local & International Businesses (Facilitating partnerships between African businesses and global stakeholders)'
    ],
    pillars: [
      'Transparency and trust',
      'Shared value creation',
      'Long-term relationships',
      'Professional execution',
      'Mutual commercial benefit'
    ]
  },
  contact: {
    corporateOffice: 'Accra, Ghana',
    telephone: '+233 246470010',
    email: 'info@developersenergy.com',
    inquiriesNote: 'For partnerships, investment opportunities, energy advisory services, and commercial collaborations, please contact: +233 246470010'
  }
};

export const STRATEGIC_TRACKS: StrategicTrack[] = [
  {
    id: 'bdc-operations',
    title: 'BDC Operations & Bulk Importation',
    iconName: 'Building2',
    stage: 'Phase 1 Rollout',
    horizon: '2026 - 2027',
    summary: 'Direct participation in the bulk procurement, importation, storage, and wholesale distribution of clean petroleum products across Ghana and West Africa.',
    details: 'The Developers Energy Limited is positioning itself to acquire full Bulk Distribution Company (BDC) license credentials in Ghana. This track unlocks direct access to international tender allocations, bulk tank farm leases, and direct wholesale supply agreements with major Oil Marketing Companies (OMCs) and mining consortia.',
    milestones: [
      'Regulatory NPA BDC Licensing Dossier Submission',
      'Strategic Tank Storage Offtake Agreements in Tema & Takoradi',
      'Initial 25,000 MT Gasoil & MOGAS Bulk Cargo Importation',
      'Establishment of Regional B2B Wholesale Distribution Network'
    ]
  },
  {
    id: 'upstream-collaborations',
    title: 'Upstream Participation & Technical Alliances',
    iconName: 'Compass',
    stage: 'Strategic Horizon',
    horizon: '2027 - 2029',
    summary: 'Strategic equity participation, farm-in joint ventures, and oilfield service partnerships across West African hydrocarbon basins.',
    details: 'Leveraging regional domain knowledge and technical networks, TDE aims to participate in upstream exploration and production (E&P) blocks as a non-operating local indigenous partner, offering local content synergy, asset management, and commercial off-take security.',
    milestones: [
      'Indigenization & Local Content Technical Registration',
      'Consortium Formation with International E&P Operators',
      'Participation in Marginal Field Farm-In Opportunities',
      'Offtake Financing Structure for Early Production Schemes'
    ]
  },
  {
    id: 'trade-desk',
    title: 'Structured International Energy Trade Desk',
    iconName: 'Globe2',
    stage: 'Active',
    horizon: 'Ongoing Expansion',
    summary: 'A high-performance trading desk executing physical and structured financial transactions across West Africa, Gulf of Guinea, and ARA hubs.',
    details: 'Expanding TDE\'s active desk capabilities to provide multi-commodity liquidity (Crude Oil, Automotive Gas Oil, Premium Motor Spirit, Liquefied Petroleum Gas, Aviation Turbine Kerosene). Integrating trade finance credit facilities, derivative price hedging, and vessel chartering.',
    milestones: [
      'Expansion of $50M+ Revolving Letters of Credit (LC) Lines',
      'Direct Deal Structuring with Gulf of Guinea Refineries',
      'Proprietary Algorithmic Market Sentiment & Pricing Tools',
      'Cross-Border Physical Supply into Landlocked Sahelien States'
    ]
  }
];

export const SUPPORT_VECTORS: SupportVector[] = [
  {
    id: 'networks',
    iconName: 'Users',
    title: 'Industry & Refiner Networks',
    description: 'Established access to key refiners, international trading houses, and regional downstream distributors.',
    valueAdd: 'Facilitates direct counterpart Introductions and swift commercial deal origination.'
  },
  {
    id: 'governance',
    iconName: 'ShieldCheck',
    title: 'Corporate Governance & Integrity',
    description: 'Adherence to rigorous anti-money laundering (AML), anti-bribery, and international compliance protocols.',
    valueAdd: 'Provides institutional investors and tier-1 trade banks total transactional transparency.'
  },
  {
    id: 'capital',
    iconName: 'Coins',
    title: 'Capital Raising & Trade Finance',
    description: 'Partnerships with trade finance institutions, private equity, and structured debt providers.',
    valueAdd: 'Unlocks tailored credit facilities, back-to-back LCs, and cargo off-take financing.'
  },
  {
    id: 'expertise',
    iconName: 'Wrench',
    title: 'Technical & Marine Engineering',
    description: 'Deep domain expertise in vessel laycan scheduling, cargo loss control, depot engineering, and quality assurance.',
    valueAdd: 'Minimizes transit demurrage, operational losses, and quality variance risks.'
  },
  {
    id: 'compliance',
    iconName: 'FileCheck',
    title: 'Regulatory & NPA Liaison',
    description: 'Granular alignment with Ghana National Petroleum Authority (NPA), EPA, and Maritime Authority standards.',
    valueAdd: 'Streamlines cargo discharge permits, tax exemptions, and regulatory clearances.'
  },
  {
    id: 'mentorship',
    iconName: 'Lightbulb',
    title: 'Strategic Advisory & Mentorship',
    description: 'Senior energy advisory council providing geopolitical risk guidance and market timing intelligence.',
    valueAdd: 'Protects commercial positions against sudden macro oil price volatility.'
  }
];

export const INSIGHT_ARTICLES: InsightArticle[] = [
  {
    id: 'q3-2026-petroleum-outlook',
    title: 'West Africa Petroleum Price Trends & Q3 Market Outlook',
    category: 'Market Analysis',
    date: 'July 24, 2026',
    readTime: '6 min read',
    excerpt: 'An analysis of crude oil benchmark shifts, European refinery crack spreads, and freight rate dynamics impacting ex-refinery pump prices in Ghana and regional markets.',
    content: [
      'The West African refined products market experienced heightened volatility during Q2 2026, driven by geopolitical realignments, shifting freight routes across the Atlantic basin, and fluctuating refinery utilization rates in Europe and the Middle East.',
      'In Ghana, the bi-weekly pricing window governed by National Petroleum Authority (NPA) guidelines saw Gasoil and MOGAS prices adjust in response to foreign exchange movements and international FOB ARA benchmarks. Local market participants who maintained disciplined currency hedging and structured supply contracts successfully mitigated margin compression.',
      'Looking into Q3 2026, we anticipate steady demand growth across the mining and transport sectors in West Africa, with seasonal rainfall potentially affecting inland depot logistics. Traders and BDCs are advised to lock in forward freight agreements and maintain diversified counterparty exposures.'
    ],
    keyTakeaways: [
      'Gasoil crack spreads expected to hold between $18-$22/bbl range in Q3.',
      'Cedi stability against the USD remains a critical determinant for domestic pricing windows.',
      'Depot storage optimization in Tema will offer competitive arbitrage advantages for early stock buyers.'
    ],
    author: 'TDE Market Intelligence Unit',
    chartData: [
      { label: 'Jan', value: 78.2 },
      { label: 'Feb', value: 80.5 },
      { label: 'Mar', value: 83.1 },
      { label: 'Apr', value: 81.4 },
      { label: 'May', value: 84.8 },
      { label: 'Jun', value: 82.5 }
    ],
    featured: true
  },
  {
    id: 'npa-deregulation-updates',
    title: 'Navigating Ghana NPA Regulatory Framework & Compliance Shifts',
    category: 'Policy Watch',
    date: 'July 18, 2026',
    readTime: '4 min read',
    excerpt: 'Key policy updates regarding NPA fuel quality specifications, marking fees, and tax regime adjustments for bulk importers and oil marketing companies.',
    content: [
      'Regulatory compliance remains the bedrock of sustainable petroleum operations in Ghana. Recent directives issued by the National Petroleum Authority (NPA) emphasize strict enforcement of 10ppm ultra-low sulfur diesel standards and digital fuel marking tracking across all inland transport corridors.',
      'For new entrants seeking BDC licensing or trade deal facilitation, understanding NPA submission prerequisites—such as bank guarantees, storage minimums, and local content quotas—is essential to avoid costly delays.',
      'The Developers Energy Limited continues to work closely with regulatory experts to ensure seamlessly compliant transaction flows for all our international and domestic trading partners.'
    ],
    keyTakeaways: [
      '10ppm sulfur limits strictly enforced across all marine and inland bulk discharges.',
      'Digital fuel marking verification required prior to truck loading at all Tema tank farms.',
      'Streamlined licensing pathways created for indigenous energy advisory firms.'
    ],
    author: 'Compliance & Legal Advisory Desk',
    featured: false
  },
  {
    id: 'b2b-trade-risk-mitigation',
    title: 'Structured Trade Risk Mitigation in Volatile Energy Markets',
    category: 'Industry Report',
    date: 'July 10, 2026',
    readTime: '5 min read',
    excerpt: 'How downstream importers and industrial off-takers can utilize structured letters of credit, price risk hedging, and off-take contracts to preserve capital.',
    content: [
      'Fluctuating global oil prices combined with local currency fluctuations present significant operational risks for bulk fuel buyers. A sudden 5% depreciation in currency value during a 30-day laycan can wipe out the net margin of a physical trade deal.',
      'In this report, we detail the core building blocks of structured energy finance: using confirmed irrevocable Letters of Credit (LCs), collateral management agreements (CMAs) in bonded tank farms, and benchmark-linked pricing clauses.',
      'By implementing disciplined risk frameworks, energy companies can guarantee product delivery while shielding balance sheets from unwanted downside volatility.'
    ],
    keyTakeaways: [
      'Collateral Management Agreements (CMAs) unlock inventory financing for growing BDCs.',
      'Back-to-back LCs eliminate counterparty default risk in cross-border petroleum trades.',
      'Incorporating Platts/Argus index floaters protects margins against overnight benchmark swings.'
    ],
    author: 'Structured Energy Finance Team',
    featured: false
  },
  {
    id: 'sub-saharan-bunker-logistics',
    title: 'Bunkering & Offshore Marine Fuel Logistics in the Gulf of Guinea',
    category: 'Supply & Logistics',
    date: 'June 28, 2026',
    readTime: '7 min read',
    excerpt: 'An operational survey of offshore ship-to-ship (STS) bunkering logistics, marine safety protocols, and fuel specification compliance.',
    content: [
      'The Gulf of Guinea represents one of Africa\'s busiest maritime corridors for container ships, bulk carriers, and offshore support vessels (OSVs). Demand for compliant VLSFO (Very Low Sulfur Fuel Oil) and Marine Gasoil (MGO) continues to expand.',
      'Executing STS operations requires meticulous coordination between vessel captains, port authorities, weather monitoring systems, and accredited surveyors to guarantee zero-spill safety standards and accurate mass flow meter measurements.',
      'TDE provides advisory and facilitation services for offshore marine logistics, ensuring international MARPOL Annex VI compliance at every stage.'
    ],
    keyTakeaways: [
      'VLSFO demand in West African ports grew by 8.4% year-on-year.',
      'Mass flow meter certification significantly reduces bunker quantity disputes.',
      'Accra-Tema corridor positioning provides optimal logistical access for regional marine fleets.'
    ],
    author: 'Marine & Offshore Logistics Advisory',
    featured: false
  }
];

export const TRAINING_COURSES: TrainingCourse[] = [
  {
    id: 'petroleum-trading-masterclass',
    title: 'Petroleum Trading Operations & Incoterms 2020',
    category: 'Trading Operations',
    duration: '3 Days (Executive Intensive)',
    targetAudience: 'Trade Operations Managers, Freight Coordinators, Energy Bankers & BDC Analysts',
    overview: 'A practical, hands-on masterclass covering the lifecycle of physical oil trades—from deal term sheet structuring, Incoterms (FOB, CIF, DAP), bill of lading issuance, vessel laycan management, to demurrage calculation and settlement.',
    modules: [
      'Module 1: Global Petroleum Markets & Benchmark Pricing Mechanics (Platts, Argus, ICE)',
      'Module 2: Incoterms 2020 in Physical Oil Deals: Risk Transfer & Insurance',
      'Module 3: Laycan Scheduling, NOR, Tanker Chartering & Demurrage Calculations',
      'Module 4: Letter of Credit (LC) Structuring & Trade Documentation Verification'
    ],
    upcomingDates: ['August 18 - 20, 2026', 'October 14 - 16, 2026'],
    fee: '$1,200 / Participant',
    badge: 'Popular Masterclass'
  },
  {
    id: 'hsse-petroleum-handling',
    title: 'HSSE Excellence in Bulk Fuel Storage & Depots',
    category: 'Safety & Engineering',
    duration: '2 Days (Certification Course)',
    targetAudience: 'Depot Managers, HSSE Officers, Maintenance Engineers & Fuel Terminal Supervisors',
    overview: 'Comprehensive training focused on health, safety, security, and environmental protection across petroleum handling facilities. Aligned with OSHA, API, and NPA standards.',
    modules: [
      'Module 1: Hazard Identification & Emergency Response Protocols in Fuel Depots',
      'Module 2: Static Electricity Control, Vapor Recovery & Tank Fire Prevention',
      'Module 3: Environmental Protection Agency (EPA) Spill Prevention & Containment',
      'Module 4: Auditing & Incident Investigation Reporting'
    ],
    upcomingDates: ['September 8 - 9, 2026', 'November 10 - 11, 2026'],
    fee: '$850 / Participant'
  },
  {
    id: 'energy-risk-management',
    title: 'Petroleum Price Risk Management & Derivatives',
    category: 'Finance & Risk',
    duration: '2 Days',
    targetAudience: 'Chief Financial Officers, Risk Officers, Treasury Managers & Commodity Traders',
    overview: 'Learn how to construct hedging strategies using Swaps, Futures, and Options to lock in profit margins and protect oil portfolios against severe market downturns.',
    modules: [
      'Module 1: Understanding Price Volatility & Crack Spread Risk Exposure',
      'Module 2: Futures, Swaps & Options Mechanics for Downstream Fuel Importers',
      'Module 3: Building Real-World Hedging Models & Margin Call Risk Controls',
      'Module 4: Foreign Exchange (FX) Risk Hedging in West African Markets'
    ],
    upcomingDates: ['September 22 - 23, 2026', 'December 2 - 3, 2026'],
    fee: '$1,100 / Participant'
  },
  {
    id: 'fuel-station-management',
    title: 'Retail Fuel Station Engineering & Operational Management',
    category: 'Asset Management',
    duration: '2 Days',
    targetAudience: 'Oil Marketing Company (OMC) Managers, Retail Station Owners & Operations Directors',
    overview: 'A deep dive into optimizing retail station operations—from underground tank integrity testing, fuel calibration accuracy, pump maintenance, to non-fuel revenue expansion.',
    modules: [
      'Module 1: Retail Station Site Selection, Environmental Permits & Engineering Design',
      'Module 2: Fuel Loss Prevention, ATG Systems & Calibration Standards',
      'Module 3: Non-Fuel Revenue Strategies (Convenience, Quick Service Retail, Auto Care)',
      'Module 4: Customer Experience, Station Staff Leadership & Security'
    ],
    upcomingDates: ['August 26 - 27, 2026', 'October 28 - 29, 2026'],
    fee: '$750 / Participant'
  }
];
