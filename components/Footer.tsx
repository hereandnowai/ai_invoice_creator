
import React from 'react';
import { BrandConfig } from '../types';
import { SocialIcons } from './icons/SocialIcons';

interface FooterProps {
  brandConfig: BrandConfig;
}

export const Footer: React.FC<FooterProps> = ({ brandConfig }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-400 py-8 px-4 border-t border-gray-700"> {/* Static dark theme footer */}
      <div className="container mx-auto text-center space-y-6">
        
        <div className="flex justify-center space-x-6 mb-4">
          <SocialIcons 
            socialMedia={brandConfig.socialMedia} 
            iconColor={brandConfig.colors.primary} 
            className="w-6 h-6" 
          />
        </div>

        <div className="space-y-1 text-sm">
          <p>
            <a href={brandConfig.website} target="_blank" rel="noopener noreferrer" className={`hover:text-[${brandConfig.colors.primary}] transition-colors`}>
              {brandConfig.website}
            </a>
          </p>
          <p>
            <a href={`mailto:${brandConfig.email}`} className={`hover:text-[${brandConfig.colors.primary}] transition-colors`}>
              {brandConfig.email}
            </a>
            <span className="mx-2">|</span>
            <a href={`tel:${brandConfig.mobile.replace(/\s/g, '')}`} className={`hover:text-[${brandConfig.colors.primary}] transition-colors`}>
              {brandConfig.mobile}
            </a>
          </p>
        </div>
        
        <div className="text-xs space-y-1">
          <p>&copy; {currentYear} {brandConfig.longName}. All Rights Reserved.</p>
          <p>Developed by Adhithya J [ AI Products Engineering Team ]</p>
        </div>
        
        <p className={`text-sm italic text-[${brandConfig.colors.primary}] mt-4`}>
          "{brandConfig.slogan}"
        </p>

      </div>
    </footer>
  );
};