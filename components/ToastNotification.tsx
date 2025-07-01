
import React, { useEffect, useState } from 'react';
import { XMarkIcon, CheckCircleIcon } from './icons/ActionIcons'; // CheckCircleIcon should exist or be added
import { NotificationType } from '../App'; // Import NotificationType

interface ToastNotificationProps {
  message: string;
  type: NotificationType;
  onClose: () => void;
}

export const ToastNotification: React.FC<ToastNotificationProps> = ({ message, type, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    // Auto close is handled by App.tsx
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // Animation duration
  };

  let baseClasses = "fixed top-20 right-5 z-[100] p-4 rounded-md shadow-xl flex items-center space-x-3 transition-all duration-300 ease-in-out transform max-w-md";
  let typeClasses = "";
  let IconComponent;

  switch (type) {
    case 'success':
      typeClasses = "bg-green-600 border border-green-700 text-white";
      IconComponent = <CheckCircleIcon className="w-6 h-6" />;
      break;
    case 'error':
      typeClasses = "bg-red-600 border border-red-700 text-white";
      IconComponent = <XMarkIcon className="w-6 h-6" />; // Consider a dedicated error icon like ExclamationCircleIcon
      break;
    case 'info':
      typeClasses = "bg-blue-600 border border-blue-700 text-white";
      // Consider an InfoIcon
      IconComponent = <CheckCircleIcon className="w-6 h-6" />; // Placeholder, ideally an info icon
      break;
    default:
      typeClasses = "bg-gray-700 border border-gray-600 text-white";
      IconComponent = null; 
  }

  const animationClasses = isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12';

  return (
    <div
      className={`${baseClasses} ${typeClasses} ${animationClasses}`}
      role="alert"
      aria-live={type === 'error' ? 'assertive' : 'polite'} // Assertive for errors, polite for others
    >
      {IconComponent && <div className="flex-shrink-0">{IconComponent}</div>}
      <p className="flex-grow text-sm font-medium">{message}</p>
      <button
        onClick={handleClose}
        className="flex-shrink-0 p-1.5 -m-1.5 rounded-md hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 transition-colors"
        aria-label="Close notification"
      >
        <XMarkIcon className="w-5 h-5" />
      </button>
    </div>
  );
};
