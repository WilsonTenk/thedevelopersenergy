// Centralized image paths imported cleanly for Vite bundler optimization
import companyLogoImg from '../assets/images/Logo for Developer energy.PNG';
import blackLogoImg from '../assets/images/Black logo.PNG';
import hero1Img from '../assets/images/hero-1.png';
import hero2Img from '../assets/images/hero-2.png';
import hero3Img from '../assets/images/Hero-3.png';
import bannerImageOne from '../assets/images/banner image one.jpg';
import bannerTwo from '../assets/images/banner 2.jpg';
import panoramicRefineryBannerImg from '../assets/images/panoramic_refinery_banner_1785591039422.jpg';

export const SITE_IMAGES = {
  logo: companyLogoImg,
  logoHeader: blackLogoImg,
  logoWhite: companyLogoImg,
  logoColor: companyLogoImg,
  heroSlides: [
    {
      id: 'slide-1',
      title: 'West African Energy Off-Taking & Physical Oil Trade',
      subtitle: 'Facilitating high-volume crude and refined petroleum allocations across Tema, Takoradi, and international trade corridors.',
      tag: 'DIRECT TRADE ALLOCATIONS',
      url: hero1Img,
    },
    {
      id: 'slide-2',
      title: 'Automated Tank Farm Infrastructure & Terminal Logistics',
      subtitle: 'Engineering zero-loss custody transfers, radar tank gauging, and rapid ship-to-shore pipeline off-loading.',
      tag: 'TERMINAL & DEPOT ASSETS',
      url: hero2Img,
    },
    {
      id: 'slide-3',
      title: 'Offshore Marine Logistics & Structured Trade Finance',
      subtitle: 'Providing back-to-back letters of credit, FX risk hedging, and zero-demurrage vessel berth scheduling.',
      tag: 'MARINE & TRADE FINANCE',
      url: hero3Img,
    },
  ],
  horizontalBanners: {
    whyPartner: bannerImageOne,
    partnersSection: bannerTwo,
    ctaBanner: bannerTwo,
    refineryTerminal: panoramicRefineryBannerImg,
    aboutFootprint: hero1Img,
    aboutLeaderboard: hero2Img,
    servicesOperations: hero3Img,
    insightsDesk: hero1Img,
    insightsAnalytics: hero2Img,
    blogHero: hero3Img,
    blogEditorial: hero1Img,
    trainingInstitute: hero2Img,
    trainingMasterclass: hero3Img,
  },
  cardThumbnails: {
    oilTrading: hero1Img,
    riskAdvisory: hero2Img,
    terminalEngineering: hero3Img,
    marineLogistics: hero1Img,
    energyTransition: hero2Img,
    executiveTraining: hero3Img,
  },
};
