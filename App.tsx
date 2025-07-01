
import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer.tsx';
import { HomePage } from './components/HomePage';
import { AboutPage } from './components/AboutPage';
import { InvoiceForm } from './components/InvoiceForm';
import { InvoiceHistory } from './components/InvoiceHistory';
import { SettingsPanel } from './components/SettingsPanel';
import { InvoicePreviewModal } from './components/InvoicePreviewModal';
import { ToastNotification } from './components/ToastNotification';
import { Invoice, BusinessDetails, AppView } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import { BRAND_CONFIG } from './constants';

export type NotificationType = 'success' | 'error' | 'info'; // Added info type
export interface NotificationPayload {
  message: string;
  type: NotificationType;
}


const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.HOME);
  const [invoices, setInvoices] = useLocalStorage<Invoice[]>('invoices', []);
  const [businessDetails, setBusinessDetails] = useLocalStorage<BusinessDetails>(
    'businessDetails',
    {
      name: 'Your Company LLC',
      address: '123 Business Rd, Suite 456, City, State 78900',
      email: 'contact@yourcompany.com',
      phone: '555-123-4567',
      logoUrl: BRAND_CONFIG.logo.title,
      taxRate: 10,
      invoicePrefix: 'INV-',
      currencySymbol: '$',
    }
  );
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [notification, setNotification] = useState<NotificationPayload | null>(null);

  const showNotification = useCallback((payload: NotificationPayload) => {
    setNotification(payload);
  }, []);

  const handleSaveInvoice = useCallback((invoice: Invoice) => {
    let savedInvoice = invoice;
    setInvoices(prevInvoices => {
      const existingIndex = prevInvoices.findIndex(inv => inv.id === invoice.id);
      if (existingIndex > -1) {
        const updatedInvoices = [...prevInvoices];
        updatedInvoices[existingIndex] = invoice;
        return updatedInvoices;
      }
      savedInvoice = { ...invoice, id: invoice.id || Date.now().toString() };
      return [...prevInvoices, savedInvoice];
    });

    setSelectedInvoice(savedInvoice);
    setIsPreviewModalOpen(true);
    showNotification({ message: 'Invoice saved successfully!', type: 'success' });
  }, [setInvoices, showNotification]);

  const handleDeleteInvoice = useCallback((invoiceId: string) => {
    if (window.confirm('Are you sure you want to delete this invoice?')) {
      setInvoices(prevInvoices => prevInvoices.filter(inv => inv.id !== invoiceId));
      showNotification({ message: 'Invoice deleted successfully.', type: 'success' });
    }
  }, [setInvoices, showNotification]);

  const handleViewInvoice = useCallback((invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setIsPreviewModalOpen(true);
  }, []);

  const handleEditInvoice = useCallback((invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setCurrentView(AppView.INVOICE_GENERATOR);
  }, []);

  const handleSaveSettings = useCallback((settings: BusinessDetails) => {
    setBusinessDetails(settings);
    showNotification({ message: 'Settings saved successfully!', type: 'success' });
  }, [setBusinessDetails, showNotification]);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const renderView = () => {
    switch (currentView) {
      case AppView.HOME:
        return <HomePage setCurrentView={setCurrentView} brandConfig={BRAND_CONFIG} />;
      case AppView.ABOUT:
        return <AboutPage brandConfig={BRAND_CONFIG} />;
      case AppView.INVOICE_GENERATOR:
        return <InvoiceForm
                  onSave={handleSaveInvoice}
                  businessDetails={businessDetails}
                  existingInvoice={selectedInvoice}
                  onClearExistingInvoice={() => setSelectedInvoice(null)}
                  setNotification={showNotification} // Pass setNotification
                />;
      case AppView.HISTORY:
        return <InvoiceHistory
                  invoices={invoices}
                  onView={handleViewInvoice}
                  onDelete={handleDeleteInvoice}
                  onEdit={handleEditInvoice}
                  currencySymbol={businessDetails.currencySymbol}
                />;
      case AppView.SETTINGS:
        return <SettingsPanel
                  settings={businessDetails}
                  onSave={handleSaveSettings}
                />;
      default:
        return <HomePage setCurrentView={setCurrentView} brandConfig={BRAND_CONFIG} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0D1117] text-gray-200">
      <Header
        brandConfig={BRAND_CONFIG}
        currentView={currentView}
        setCurrentView={setCurrentView}
      />
      <main className="flex-grow container mx-auto px-4 py-8">
        {renderView()}
      </main>
      <Footer brandConfig={BRAND_CONFIG} />
      {selectedInvoice && isPreviewModalOpen && (
        <InvoicePreviewModal
          invoice={selectedInvoice}
          businessDetails={businessDetails}
          isOpen={isPreviewModalOpen}
          onClose={() => {
            setIsPreviewModalOpen(false);
            setSelectedInvoice(null);
          }}
        />
      )}
      {notification && (
        <ToastNotification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
};

export default App;