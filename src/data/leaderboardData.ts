export interface LeaderboardExecutive {
  rank: number;
  name: string;
  role: string;
  division: string;
  experienceYears: number;
  dealVolumeMetric: string;
  reliabilityScore: string;
  specialty: string[];
  bioSummary: string;
  fullBio: string;
  education: string;
  keyProjects: string[];
  badgeType: 'gold' | 'silver' | 'bronze' | 'elite';
  featuredAchievement: string;
  imageUrl: string;
  linkedinUrl: string;
  twitterUrl?: string;
  email: string;
  phone: string;
  location: string;
}

export interface MilestoneLeaderboardItem {
  rank: number;
  dealTitle: string;
  category: 'Commodity Allocation' | 'Trade Finance' | 'Infrastructure' | 'Human Capital';
  volumeOrValue: string;
  location: string;
  impactScore: string;
  year: string;
  clientSegment: string;
  summary: string;
  leadExecutive: string;
}

export const EXECUTIVE_LEADERBOARD: LeaderboardExecutive[] = [
  {
    rank: 1,
    name: 'Kennedy Awuku Addo',
    role: 'Chief Executive Officer & Head of Energy Trade',
    division: 'Executive Directorate & Trade Desk',
    experienceYears: 22,
    dealVolumeMetric: '$1.5B+ Facilitated Trade',
    reliabilityScore: '99.9% Execution Rate',
    specialty: ['Crude & Refined Allocations', 'Structured Trade Finance', 'Global Counterparty Relations'],
    bioSummary: 'Pioneered physical oil trading structures across West Africa. Oversees international refiner allocations and strategic trade desk operations.',
    fullBio: 'Kennedy Awuku Addo brings over two decades of physical petroleum commodity trading experience across the Gulf of Guinea and international energy hubs. Prior to founding The Developers Energy Limited, Kennedy served as Senior Oil Trader and Country Manager for international trading houses in London and Geneva. He has originated and executed over $1.5B in physical crude oil, Gasoil, Mogas, and Jet Fuel transactions, establishing long-term off-take agreements with state refiners and tier-1 BDCs.',
    education: 'M.Sc. Energy Economics (University of Dundee), B.Sc. Mechanical Engineering (KNUST)',
    keyProjects: [
      'Structured $150M+ syndicated LC trade credit facilities with West African trade banks',
      'Pioneered 120,000 MT Gasoil 10ppm term allocations into Tema Port',
      'Established direct refinery off-take routes across Gulf of Guinea'
    ],
    badgeType: 'gold',
    featuredAchievement: 'Structured $150M+ syndicated LC trade facilities for West African BDCs.',
    imageUrl: '',
    linkedinUrl: 'https://linkedin.com/in/kennedy-awuku-addo-energy',
    twitterUrl: 'https://x.com/k_awuku_addo',
    email: 'k.awukuaddo@developersenergy.com',
    phone: '+233 246470010',
    location: 'Accra, Ghana & London, UK'
  },
  {
    rank: 2,
    name: 'Jeffery Kwesi Boateng',
    role: 'Managing Director & Head of Energy Advisory & Risk',
    division: 'Advisory, Compliance & Market Intel',
    experienceYears: 19,
    dealVolumeMetric: '310+ Risk & Feasibility Audits',
    reliabilityScore: '100% NPA Compliance',
    specialty: ['FX Risk Hedging', 'Downstream Regulatory Compliance', 'Macro Energy Intelligence'],
    bioSummary: 'Senior advisor on regional petroleum economics and downstream risk. Leads macroeconomic risk profiling and compliance frameworks for energy transactions.',
    fullBio: 'Jeffery Kwesi Boateng is a recognized authority on West African downstream petroleum economics, price risk hedging, and regulatory governance. Having advised national energy commissions, central bank committees, and commercial banking boards, he directs The Developers Energy market intelligence desk, ensuring every transaction adheres strictly to National Petroleum Authority (NPA) standards and international sanctions screening.',
    education: 'Ph.D. Petroleum Economics (Imperial College London), M.Sc. Finance (LSE)',
    keyProjects: [
      'Architected ex-refinery parity price risk models adopted by regional BDCs',
      'Led 310+ commercial due diligence & feasibility audits across Ghana and Nigeria',
      'Created proprietary FX margin protection matrix for energy importers'
    ],
    badgeType: 'silver',
    featuredAchievement: 'Architected FX hedging model protecting BDC margins during currency swings.',
    imageUrl: '',
    linkedinUrl: 'https://linkedin.com/in/jeffery-kwesi-boateng-risk',
    twitterUrl: 'https://x.com/jkboateng_energy',
    email: 'j.boateng@developersenergy.com',
    phone: '+233 246470010',
    location: 'Accra, Ghana'
  },
  {
    rank: 3,
    name: 'Emmanuel Osei-Tutu',
    role: 'Director of Engineering & Terminal Infrastructure',
    division: 'Downstream Engineering Assets',
    experienceYears: 19,
    dealVolumeMetric: '450K m³ Depot Capacity Managed',
    reliabilityScore: 'Zero Loss Custody Standard',
    specialty: ['Tank Farm Feasibility', 'Pipeline Automation', 'EPA Environmental Filings'],
    bioSummary: 'Veteran petroleum engineer specializing in terminal design, automated metering systems, and ship-to-shore pipeline maintenance.',
    fullBio: 'Emmanuel Osei-Tutu has spearheaded engineering and maintenance operations for major bulk liquid storage terminals across Ghana, Nigeria, and Côte d\'Ivoire. With 19 years of hands-on experience in tank farm calibration, SCADA pipeline automation, and environmental safety audits, Emmanuel ensures all terminal assets operate with zero product loss and zero HSE incidents.',
    education: 'B.Sc. Chemical Engineering (KNUST), Chartered Petroleum Engineer (EI UK)',
    keyProjects: [
      'Engineering overhaul of 120,000 m³ bonded fuel terminal at Tema Port',
      'Designed automated radar gauging & meter calibration systems for 6 major depots',
      'Led EPA environmental clearance for Takoradi energy corridor expansion'
    ],
    badgeType: 'bronze',
    featuredAchievement: 'Directed engineering overhaul for 120,000 m³ Tema bonded oil terminal.',
    imageUrl: '',
    linkedinUrl: 'https://linkedin.com/in/emmanuel-oseitutu-engineering',
    email: 'e.oseitutu@developersenergy.com',
    phone: '+233 246470010',
    location: 'Tema / Takoradi, Ghana'
  },
  {
    rank: 4,
    name: 'Captain Fiifi Addo',
    role: 'Lead Director of Marine & Port Logistics',
    division: 'Marine Operations & Cargo Off-taking',
    experienceYears: 16,
    dealVolumeMetric: '320+ Tanker Vessel Berths',
    reliabilityScore: 'Zero Demurrage Record',
    specialty: ['STS Off-loading Logistics', 'Deepwater Port Operations', 'Vessel Chartering & Quality Control'],
    bioSummary: 'Master Mariner managing all berth allocations, STS transfers, and zero-demurrage vessel operations at Tema and Takoradi ports.',
    fullBio: 'Captain Fiifi Addo is a licensed Master Mariner with 16 years of marine command and port operations leadership. Having commanded MR2 and Aframax oil tankers globally, he leads TDE marine off-taking division, coordinating ship-to-ship (STS) transfers, draft surveys, vessel chartering, and berth priority clearance to minimize laycan risks and prevent demurrage charges.',
    education: 'Master Mariner Class 1 Unlimited (UK MCA), M.Sc. Maritime Affairs (WMU Sweden)',
    keyProjects: [
      'Maintained zero demurrage across 45 consecutive deepwater tanker discharges',
      'Coordinated complex 50,000 DWT Mogas Ship-to-Ship (STS) transfer offshore Ghana',
      'Established standardized marine safety protocol for petroleum jetties'
    ],
    badgeType: 'elite',
    featuredAchievement: 'Maintained 100% zero-demurrage record for 45 consecutive vessel discharges.',
    imageUrl: '',
    linkedinUrl: 'https://linkedin.com/in/captain-fiifi-addo-marine',
    twitterUrl: 'https://x.com/capt_fiifi_addo',
    email: 'f.addo@developersenergy.com',
    phone: '+233 246470010',
    location: 'Takoradi Port & Offshore Ghana'
  },
  {
    rank: 5,
    name: 'Sarah Lawson',
    role: 'Head of Energy Transition & Corporate Training',
    division: 'Training Institute & Sustainable Advisory',
    experienceYears: 14,
    dealVolumeMetric: '650+ Energy Professionals Trained',
    reliabilityScore: 'ISO 9001 Certified Programs',
    specialty: ['Clean Energy Integration', 'Executive Capacity Building', 'Downstream HSE Management'],
    bioSummary: 'Drives technical workforce development, safety protocols, and clean fuel transition strategies for regional oil and gas entities.',
    fullBio: 'Sarah Lawson leads human capacity development and sustainable energy strategies at The Developers Energy Limited. She has trained over 650 oil operations personnel, trade desk analysts, and regulatory officers across West Africa. Her expertise encompasses Incoterms 2020 trading masterclasses, terminal HSE certification, and low-sulfur fuel transition strategies.',
    education: 'M.A. Sustainability Leadership (Cambridge University), B.A. Business Admin (UGBS)',
    keyProjects: [
      'Founded the West Africa Energy Executive Training Institute',
      'Created custom Incoterms & Trade Finance curriculum for regional banking energy desks',
      'Published executive briefings on West Africa low-sulfur Gasoil adoption'
    ],
    badgeType: 'elite',
    featuredAchievement: 'Established West Africa Petroleum Executive Training Institute.',
    imageUrl: '',
    linkedinUrl: 'https://linkedin.com/in/sarah-lawson-energy-training',
    email: 's.lawson@developersenergy.com',
    phone: '+233 246470010',
    location: 'Accra, Ghana'
  }
];

export const MILESTONE_LEADERBOARD: MilestoneLeaderboardItem[] = [
  {
    rank: 1,
    dealTitle: '120,000 MT Gasoil 10ppm Cargo Structuring',
    category: 'Commodity Allocation',
    volumeOrValue: '$98.5M Valuation',
    location: 'Tema Deepwater Port',
    impactScore: '10/10 Priority Rank',
    year: '2026 Q1',
    clientSegment: 'Consortium of BDCs',
    summary: 'Structured and executed multi-vessel Gasoil 10ppm import allocations with ex-refinery parity price optimization for leading bulk distribution companies in Ghana.',
    leadExecutive: 'Kennedy Awuku Addo'
  },
  {
    rank: 2,
    dealTitle: '$150M Syndicated Trade Finance & LC Facility',
    category: 'Trade Finance',
    volumeOrValue: '$150.0M Capacity',
    location: 'Accra / London Desk',
    impactScore: '9.9/10 Priority Rank',
    year: '2025 Q4',
    clientSegment: 'Tier-1 Trade Banks',
    summary: 'Facilitated back-to-back Letter of Credit (LC) trade lines between international commodity banks and regional importers, securing smooth fuel supply continuity.',
    leadExecutive: 'Jeffery Kwesi Boateng'
  },
  {
    rank: 3,
    dealTitle: '150,000 m³ Takoradi Petroleum Terminal Feasibility',
    category: 'Infrastructure',
    volumeOrValue: '150k m³ Storage',
    location: 'Takoradi Port Zone',
    impactScore: '9.8/10 Priority Rank',
    year: '2025 Q3',
    clientSegment: 'Private Energy Terminal Operator',
    summary: 'Delivered technical engineering and environmental feasibility dossier for a state-of-the-art multi-product fuel depot with automated SCADA metering.',
    leadExecutive: 'Emmanuel Osei-Tutu'
  },
  {
    rank: 4,
    dealTitle: '50,000 DWT Vessel Ship-to-Ship (STS) Transfer',
    category: 'Commodity Allocation',
    volumeOrValue: '42,000 MT Mogas',
    location: 'Offshore Offshore Ghana',
    impactScore: '9.7/10 Priority Rank',
    year: '2025 Q2',
    clientSegment: 'International Trader',
    summary: 'Coordinated zero-incident, zero-demurrage offshore ship-to-ship transfer of Mogas under adverse sea state conditions with full customs & marine clearance.',
    leadExecutive: 'Captain Fiifi Addo'
  },
  {
    rank: 5,
    dealTitle: 'Petroleum Trading & Derivatives Executive Masterclass',
    category: 'Human Capital',
    volumeOrValue: '120 Executive Delegates',
    location: 'Accra Trade Center',
    impactScore: '9.5/10 Priority Rank',
    year: '2026 Q1',
    clientSegment: 'Regional Energy Regulators & OMCs',
    summary: 'Hosted 5-day executive masterclass for senior risk officers, petroleum traders, and regulators focusing on Incoterms 2020, hedging, and demurrage control.',
    leadExecutive: 'Sarah Lawson'
  }
];

