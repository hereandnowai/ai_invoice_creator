import React, { useState, useEffect } from 'react';
import { BusinessDetails } from '../types';
import { INPUT_CLASS, BUTTON_PRIMARY_CLASS, CARD_CLASS, BRAND_CONFIG } from '../constants';

interface SettingsPanelProps {
  settings: BusinessDetails;
  onSave: (settings: BusinessDetails) => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({ settings, onSave }) => {
  const [currentSettings, setCurrentSettings] = useState<BusinessDetails>(settings);

  useEffect(() => {
    setCurrentSettings(settings);
  }, [settings]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentSettings(prev => ({
      ...prev,
      [name]: name === 'taxRate' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentSettings.taxRate < 0 || currentSettings.taxRate > 100) {
        alert("Tax rate must be between 0 and 100.");
        return;
    }
    if (!currentSettings.name || !currentSettings.email || !currentSettings.invoicePrefix || !currentSettings.currencySymbol) {
        alert("Business Name, Email, Invoice Prefix, and Currency Symbol are required.");
        return;
    }
    onSave(currentSettings);
  };
  
  const labelClass = "block text-sm font-medium text-gray-300 mb-1";

  return (
    <form onSubmit={handleSubmit} className={`${CARD_CLASS} space-y-8`}>
      <h2 className={`text-3xl font-bold text-[${BRAND_CONFIG.colors.primary}] border-b-2 border-[${BRAND_CONFIG.colors.primary}] pb-2`}>Business Settings</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className={labelClass}>Business Name</label>
          <input type="text" name="name" id="name" value={currentSettings.name} onChange={handleChange} className={INPUT_CLASS} required />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>Business Email</label>
          <input type="email" name="email" id="email" value={currentSettings.email} onChange={handleChange} className={INPUT_CLASS} required />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>Business Phone</label>
          <input type="tel" name="phone" id="phone" value={currentSettings.phone} onChange={handleChange} className={INPUT_CLASS} />
        </div>
        <div>
          <label htmlFor="logoUrl" className={labelClass}>Logo URL (Optional)</label>
          <input type="url" name="logoUrl" id="logoUrl" value={currentSettings.logoUrl || ''} onChange={handleChange} className={INPUT_CLASS} placeholder="https://example.com/logo.png" />
        </div>
      </div>

      <div>
        <label htmlFor="address" className={labelClass}>Business Address</label>
        <textarea name="address" id="address" value={currentSettings.address} onChange={handleChange} rows={3} className={INPUT_CLASS}></textarea>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label htmlFor="taxRate" className={labelClass}>Tax Rate (%)</label>
          <input type="number" name="taxRate" id="taxRate" value={currentSettings.taxRate} onChange={handleChange} className={INPUT_CLASS} min="0" max="100" step="0.01" required />
        </div>
        <div>
          <label htmlFor="invoicePrefix" className={labelClass}>Invoice Prefix</label>
          <input type="text" name="invoicePrefix" id="invoicePrefix" value={currentSettings.invoicePrefix} onChange={handleChange} className={INPUT_CLASS} placeholder="INV-" required/>
        </div>
        <div>
          <label htmlFor="currencySymbol" className={labelClass}>Currency Symbol</label>
          <input type="text" name="currencySymbol" id="currencySymbol" value={currentSettings.currencySymbol} onChange={handleChange} className={INPUT_CLASS} placeholder="$" required/>
        </div>
      </div>
      
      <div className="flex justify-end pt-6 border-t border-gray-700">
        <button type="submit" className={BUTTON_PRIMARY_CLASS}>
          Save Settings
        </button>
      </div>
    </form>
  );
};