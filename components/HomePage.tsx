
import React from 'react';
import { AppView, BrandConfig } from '../types';
import { BUTTON_PRIMARY_CLASS } from '../constants';
import { SparklesIcon, TableCellsIcon, DocumentArrowDownIcon, ArchiveBoxIcon, MicrophoneIcon } from './icons/ActionIcons';

interface HomePageProps {
  setCurrentView: (view: AppView) => void;
  brandConfig: BrandConfig;
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps & { brandConfig: BrandConfig }> = ({ icon, title, description, brandConfig }) => {
  return (
    <div className={`bg-gray-700/80 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-[${brandConfig.colors.primary}]/30 transition-shadow duration-300 text-center flex flex-col items-center`}> {/* Adjusted for dark theme card */}
      <div className={`mb-4 text-[${brandConfig.colors.primary}]`}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-300 text-sm">{description}</p>
    </div>
  );
};

export const HomePage: React.FC<HomePageProps> = ({ setCurrentView, brandConfig }) => {
  const features: FeatureCardProps[] = [
    {
      icon: <SparklesIcon className="w-12 h-12" />,
      title: "Automated Generation",
      description: "Quickly create professional invoices with smart defaults and AI assistance."
    },
    {
      icon: <MicrophoneIcon className="w-12 h-12" />,
      title: "Voice-Powered Invoicing",
      description: "Dictate invoice details using your voice for hands-free and quick data entry."
    },
    {
      icon: <TableCellsIcon className="w-12 h-12" />,
      title: "Smart Data Entry",
      description: "Easily input customer information and line items with intuitive forms."
    },
    {
      icon: <DocumentArrowDownIcon className="w-12 h-12" />,
      title: "PDF & Download",
      description: "Instantly generate and download print-ready PDF invoices for your records."
    },
    {
      icon: <ArchiveBoxIcon className="w-12 h-12" />,
      title: "History & Tracking",
      description: "Manage and review all your past invoices with status tracking in one place."
    }
  ];

  return (
    <div className="flex flex-col items-center justify-center text-center pt-8 md:pt-12">
      <img 
        src={brandConfig.logo.title} 
        alt={`${brandConfig.shortName} Logo`} 
        className="h-20 md:h-28 mx-auto mb-8"
      />
      
      <h1 className={`text-4xl md:text-5xl font-bold mb-3 text-[${brandConfig.colors.primary}]`}>
        AI Invoice Creator
      </h1>
      <p className="text-lg text-gray-300 mb-6 italic">
        {brandConfig.slogan}
      </p>
      <p className="text-md md:text-lg text-gray-300 mb-10 max-w-2xl mx-auto px-4">
        Streamline your billing process with our intelligent invoice generator. 
        Create, manage, and send professional PDF invoices with ease, 
        powered by AI to save you time and effort.
      </p>
      <button 
        onClick={() => setCurrentView(AppView.INVOICE_GENERATOR)} 
        className={`${BUTTON_PRIMARY_CLASS} text-lg px-8 py-3 mb-16`} 
      >
        Create New Invoice
      </button>

      <div className="w-full max-w-5xl mx-auto px-4">
        <h2 className={`text-3xl font-bold text-white mb-10 border-b-2 border-[${brandConfig.colors.primary}] pb-3 inline-block`}>
          Key Features
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"> {/* Adjusted grid for 5 items */}
          {features.map(feature => (
            <FeatureCard 
              key={feature.title} 
              icon={feature.icon} 
              title={feature.title} 
              description={feature.description}
              brandConfig={brandConfig}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
