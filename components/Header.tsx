import React from 'react';
import { BrandConfig, AppView } from '../types'; // Removed Theme
import { NAVIGATION_ITEMS } from '../constants';
// Removed SunIcon, MoonIcon imports

interface HeaderProps {
  brandConfig: BrandConfig;
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  // Removed currentTheme and setTheme props
}

export const Header: React.FC<HeaderProps> = ({ brandConfig, currentView, setCurrentView }) => {
  
  // Removed toggleTheme function

  return (
    <header className="bg-[#004040] text-white shadow-md sticky top-0 z-40"> {/* Static dark theme header */}
      <div className="container mx-auto px-4 py-3 flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setCurrentView(AppView.HOME)}>
          <img src={brandConfig.logo.favicon} alt={`${brandConfig.shortName} Favicon`} className="h-10 w-10" />
          <div>
            <h1 className="text-xl font-bold text-white">{brandConfig.shortName}</h1>
            <p className="text-xs text-gray-300">{brandConfig.longName.split(" - ")[1]}</p>
            <p className={`text-xs text-[${brandConfig.colors.primary}] italic`}>{brandConfig.slogan}</p>
          </div>
        </div>
        <nav className="flex items-center space-x-1 sm:space-x-2 mt-3 sm:mt-0">
          {NAVIGATION_ITEMS.map((item) => {
            const isActive = currentView === item.value;
            const buttonClasses = `
              px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-150
              ${isActive 
                ? `bg-[${brandConfig.colors.primary}] text-black` 
                : 'text-gray-300 hover:bg-[#005A5A] hover:text-white'
              }
            `;
            return (
              <button
                key={item.value}
                onClick={() => setCurrentView(item.value)}
                className={buttonClasses.trim()}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}
              </button>
            );
          })}
          {/* Removed theme toggle button */}
        </nav>
      </div>
    </header>
  );
};