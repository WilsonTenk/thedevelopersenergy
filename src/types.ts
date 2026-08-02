export type PageTab = 'home' | 'about' | 'services' | 'insights' | 'blog' | 'training' | 'contact';

export interface BlogPost {
  id: string;
  title: string;
  subtitle?: string;
  category: 'Energy Transition' | 'Commodities & Trade' | 'Downstream Logistics' | 'Tech & Innovation' | 'Policy & Geopolitics';
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  date: string;
  readTime: string;
  excerpt: string;
  content: string[];
  tags: string[];
  featured?: boolean;
  imageUrl?: string;
}

export interface MarketRate {
  id: string;
  symbol: string;
  label: string;
  price: number;
  change: number;
  changePct: number;
  unit: string;
  category: 'crude' | 'refined' | 'forex' | 'freight';
  lastUpdated: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  iconName: string;
  subtitle: string;
  description: string;
  highlights: string[];
  deliverableList: string[];
  targetAudience: string[];
  badge?: string;
}

export interface StrategicTrack {
  id: string;
  title: string;
  iconName: string;
  stage: 'Active' | 'Phase 1 Rollout' | 'Strategic Horizon';
  horizon: string;
  summary: string;
  details: string;
  milestones: string[];
}

export interface InsightArticle {
  id: string;
  title: string;
  category: 'Market Analysis' | 'Policy Watch' | 'Industry Report' | 'Supply & Logistics';
  date: string;
  readTime: string;
  excerpt: string;
  content: string[];
  keyTakeaways: string[];
  author: string;
  chartData?: { label: string; value: number }[];
  featured?: boolean;
}

export interface TrainingCourse {
  id: string;
  title: string;
  category: string;
  duration: string;
  targetAudience: string;
  overview: string;
  modules: string[];
  upcomingDates: string[];
  fee: string;
  badge?: string;
}

export interface TradeQuoteData {
  dealType: 'Trade Facilitation' | 'Infrastructure Consultancy' | 'Market Intelligence' | 'Training Program';
  commodityProduct?: string;
  estimatedVolume?: string;
  incoterm?: 'FOB' | 'CIF' | 'DAP' | 'EXW';
  timeframe?: string;
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  notes: string;
}

export interface SupportVector {
  id: string;
  iconName: string;
  title: string;
  description: string;
  valueAdd: string;
}
