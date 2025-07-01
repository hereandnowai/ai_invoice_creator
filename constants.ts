import { BrandConfig, AppView } from './types';

export const BRAND_CONFIG: BrandConfig = {
  shortName: "HERE AND NOW AI",
  longName: "HERE AND NOW AI - Artificial Intelligence Research Institute",
  website: "https://hereandnowai.com",
  email: "info@hereandnowai.com",
  mobile: "+91 996 296 1000",
  slogan: "designed with passion for innovation",
  colors: {
    primary: "#FFDF00", // Golden Yellow
    secondary: "#004040" // Teal
  },
  logo: {
    title: "https://raw.githubusercontent.com/hereandnowai/images/refs/heads/main/logos/HNAI%20Title%20-Teal%20%26%20Golden%20Logo%20-%20DESIGN%203%20-%20Raj-07.png",
    favicon: "https://raw.githubusercontent.com/hereandnowai/images/refs/heads/main/logos/favicon-logo-with-name.png"
  },
  chatbot: {
    avatar: "https://raw.githubusercontent.com/hereandnowai/images/refs/heads/main/logos/caramel.jpeg",
    face: "https://raw.githubusercontent.com/hereandnowai/images/refs/heads/main/logos/caramel-face.jpeg"
  },
  socialMedia: {
    blog: "https://hereandnowai.com/blog",
    linkedin: "https://www.linkedin.com/company/hereandnowai/",
    instagram: "https://instagram.com/hereandnow_ai",
    github: "https://github.com/hereandnowai",
    x: "https://x.com/hereandnow_ai",
    youtube: "https://youtube.com/@hereandnow_ai"
  }
};

export const NAVIGATION_ITEMS = [
  { label: AppView.HOME, value: AppView.HOME },
  { label: AppView.INVOICE_GENERATOR, value: AppView.INVOICE_GENERATOR },
  { label: AppView.HISTORY, value: AppView.HISTORY },
  { label: AppView.ABOUT, value: AppView.ABOUT },
  { label: AppView.SETTINGS, value: AppView.SETTINGS },
];

// Updated classes for a static dark theme with yellow primary accents
export const INPUT_CLASS = `w-full p-3 border border-gray-600 rounded-md shadow-sm 
focus:ring-[${BRAND_CONFIG.colors.primary}] focus:border-[${BRAND_CONFIG.colors.primary}] 
transition duration-150 ease-in-out placeholder-gray-400 
bg-gray-700 text-white`;

export const BUTTON_PRIMARY_CLASS = `bg-[${BRAND_CONFIG.colors.primary}] text-black 
hover:bg-yellow-400 
font-semibold py-2 px-6 rounded-md shadow-md 
transition duration-150 ease-in-out transform hover:scale-105`;

export const BUTTON_SECONDARY_CLASS = `bg-gray-600 text-gray-200 hover:bg-gray-500 
font-semibold py-2 px-6 rounded-md shadow-md 
transition duration-150 ease-in-out transform hover:scale-105`;

export const CARD_CLASS = "bg-gray-800 p-6 rounded-xl shadow-lg text-gray-200";