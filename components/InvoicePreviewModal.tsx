
import React, { useRef } from 'react';
import { Invoice, BusinessDetails } from '../types';
import { BRAND_CONFIG, BUTTON_PRIMARY_CLASS, BUTTON_SECONDARY_CLASS } from '../constants';
import { generatePdf } from '../services/pdfService';
import { DownloadIcon, XMarkIcon } from './icons/ActionIcons';

interface InvoicePreviewModalProps {
  invoice: Invoice;
  businessDetails: BusinessDetails;
  isOpen: boolean;
  onClose: () => void;
}

export const InvoicePreviewModal: React.FC<InvoicePreviewModalProps> = ({ invoice, businessDetails, isOpen, onClose }) => {
  const previewRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handleDownloadPdf = async () => {
    if (previewRef.current) {
      const parentElement = previewRef.current.parentElement;
      
      previewRef.current.classList.add('pdf-render-mode');
      if (parentElement) {
        parentElement.classList.add('pdf-render-mode-parent-container');
      }
      
      // Allow browser to re-render with new classes
      await new Promise(resolve => setTimeout(resolve, 200)); // Increased delay slightly

      try {
        const sanitizedCustomerName = invoice.customer.name.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '');
        const filename = `Invoice-${invoice.invoiceNumber}${sanitizedCustomerName ? '-' + sanitizedCustomerName : ''}.pdf`;
        await generatePdf(previewRef.current, filename);
      } catch (error) {
        console.error("Error generating PDF:", error);
        alert('Failed to download PDF. Please try again.');
      } finally {
         previewRef.current.classList.remove('pdf-render-mode');
         if (parentElement) {
           parentElement.classList.remove('pdf-render-mode-parent-container');
         }
      }
    }
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const taxRateToDisplay = invoice.taxRateApplied !== undefined ? invoice.taxRateApplied : businessDetails.taxRate;

  const modalOuterBg = "bg-gray-800"; 
  const modalTextColor = "text-gray-200";
  const modalBorderColor = "border-gray-600";
  const modalSubtleTextColor = "text-gray-300";
  const modalSectionBg = "bg-gray-700";
  const previewContentBg = "bg-gray-800"; // Used for explicit background in PDF render mode

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50 overflow-y-auto transition-opacity duration-300">
      <style>{`
        .pdf-render-mode {
          font-size: 10pt !important; /* Base font size for PDF */
          height: auto !important; /* Allow content to dictate height */
          max-height: none !important; /* Remove screen max-height constraints */
          overflow: visible !important; /* Ensure all content is visible, no scrollbars */
          background-color: #1F2937 !important; /* Tailwind gray-800 (previewContentBg) for consistent capture */
          box-sizing: border-box !important; /* Ensures padding and border are included in width/height */
          /* Ensure text colors from the theme are preserved */
          color: ${modalTextColor} !important; 
        }
        .pdf-render-mode .pdf-hidden { display: none !important; }

        .pdf-render-mode-parent-container {
            height: auto !important;
            max-height: none !important;
            overflow: visible !important;
            display: block !important; /* Override flex to allow child to naturally expand */
            padding: 0 !important; /* Remove parent padding if it interferes with child capture */
        }

        /* General element resets for PDF clarity */
        .pdf-render-mode h1, .pdf-render-mode h2, .pdf-render-mode h3, .pdf-render-mode h4,
        .pdf-render-mode p, .pdf-render-mode span, .pdf-render-mode td, .pdf-render-mode th, .pdf-render-mode div {
          line-height: 1.4 !important;
        }
        /* Preserve specific text colors like primary brand color */
        .pdf-render-mode .text-\\[\\${BRAND_CONFIG.colors.primary}\\] {
           color: ${BRAND_CONFIG.colors.primary} !important;
        }
         .pdf-render-mode .${modalSubtleTextColor.replace('text-','text-')} { /* e.g. .text-gray-300 */
            color: #D1D5DB !important; /* Actual color for Tailwind gray-300 */
        }


        .pdf-render-mode strong, .pdf-render-mode .font-bold, .pdf-render-mode .font-semibold { 
            font-weight: bold !important; 
        }
        .pdf-render-mode h1 { font-size: 18pt !important; margin-bottom: 8px !important;}
        .pdf-render-mode h2 { font-size: 16pt !important; margin-bottom: 6px !important;}
        .pdf-render-mode h3 { font-size: 12pt !important; margin-bottom: 4px !important;}
        .pdf-render-mode p { margin-bottom: 4px !important; }
        
        .pdf-render-mode .print-logo-filter { 
            filter: none !important;
            max-height: 60px !important; 
        }

        /* Invoice Structure Specifics for PDF (Layout focused) */
        .pdf-render-mode .invoice-header-pdf,
        .pdf-render-mode .customer-details-pdf,
        .pdf-render-mode .items-table-container-pdf,
        .pdf-render-mode .totals-section-pdf,
        .pdf-render-mode .notes-section-pdf,
        .pdf-render-mode .status-section-pdf,
        .pdf-render-mode .footer-text-pdf {
          display: block !important;
          margin-bottom: 12px !important;
        }

        .pdf-render-mode .invoice-header-pdf {
          display: flex !important;
          justify-content: space-between !important;
          align-items: flex-start !important;
        }
        .pdf-render-mode .invoice-header-pdf > div { width: 48%; } 
        .pdf-render-mode .invoice-header-pdf .text-right { text-align: right !important; }

        .pdf-render-mode .customer-details-pdf p,
        .pdf-render-mode .invoice-header-pdf p {
            font-size: 9pt !important;
        }
        
        .pdf-render-mode .items-table-pdf { width: 100% !important; border-collapse: collapse !important; }
        .pdf-render-mode .items-table-pdf th, .pdf-render-mode .items-table-pdf td {
          padding: 6px !important;
          text-align: left !important;
          font-size: 9pt !important;
          border: 1px solid #4B5563 !important; /* Tailwind gray-600 for table cell borders */
        }
        .pdf-render-mode .items-table-pdf th { 
           background-color: #004040 !important; /* Brand Secondary */
           color: white !important;
        }
        .pdf-render-mode .items-table-pdf .text-right { text-align: right !important; }
        
        .pdf-render-mode .totals-container-pdf {
            display: flex !important; justify-content: flex-end !important; width: 100% !important; margin-top: 1rem !important;
        }
        .pdf-render-mode .totals-box-pdf {
            width: 45% !important; min-width: 280px !important; padding: 10px !important;
            background-color: #374151 !important; /* Tailwind gray-700 (modalSectionBg) */
            border-radius: 0.25rem !important; /* Replicate rounded if needed */
        }
        .pdf-render-mode .totals-box-pdf div { display: flex !important; justify-content: space-between !important; margin-bottom: 5px !important; font-size: 10pt !important; }
        .pdf-render-mode .totals-box-pdf .border-t { 
          border-top: 2px solid ${BRAND_CONFIG.colors.primary} !important;
          padding-top: 8px !important; margin-top: 8px !important; 
        }
        
        .pdf-render-mode .whitespace-pre-wrap { white-space: pre-wrap !important; }
        .pdf-render-mode .text-center { text-align: center !important; }

        .pdf-render-mode .border-\\[\\${BRAND_CONFIG.colors.primary}\\] {
           border-color: ${BRAND_CONFIG.colors.primary} !important;
        }
        .pdf-render-mode .bg-\\[\\${BRAND_CONFIG.colors.primary}\\] {
           background-color: ${BRAND_CONFIG.colors.primary} !important;
           color: black !important; /* Ensure text readability on primary bg */
        }
        .pdf-render-mode .bg-yellow-600\\/30 { /* For status */
            background-color: rgba(202, 138, 4, 0.3) !important; /* Tailwind yellow-600/30 */
        }
        .pdf-render-mode .${modalSectionBg.replace('bg-','bg-')} { /* e.g. .bg-gray-700 */
            background-color: #374151 !important; /* Actual color for Tailwind gray-700 */
        }
        /* Specific borders */
        .pdf-render-mode .border-gray-600 { border-color: #4B5563 !important; }
        .pdf-render-mode .border-gray-700 { border-color: #374151 !important; }

      `}</style>
      <div className={`${modalOuterBg} p-6 md:p-8 rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col ${modalTextColor}`}>
        <div className={`flex justify-between items-center mb-6 pb-4 border-b ${modalBorderColor}`}>
          <h2 className={`text-2xl font-bold text-[${BRAND_CONFIG.colors.primary}]`}>Invoice Preview</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-red-400 transition-colors">
            <XMarkIcon className="w-8 h-8" />
          </button>
        </div>
        
        {/* This is the parent element that will get .pdf-render-mode-parent-container */}
        <div className={`overflow-y-auto p-4 md:p-6 border ${modalBorderColor} rounded-md text-sm flex-grow ${previewContentBg}`} ref={previewRef}>
          {/* Invoice Header */}
          <div className="invoice-header-pdf flex justify-between items-start mb-8">
            <div>
              {businessDetails.logoUrl && <img src={businessDetails.logoUrl} alt={businessDetails.name} className={`h-16 mb-2 print-logo-filter`} />}
              <h1 className={`text-2xl font-bold text-[${BRAND_CONFIG.colors.primary}]`}>{businessDetails.name}</h1>
              <p className={modalSubtleTextColor}>{businessDetails.address}</p>
              <p className={modalSubtleTextColor}>{businessDetails.email} | {businessDetails.phone}</p>
            </div>
            <div className="text-right">
              <h2 className={`text-3xl font-semibold text-[${BRAND_CONFIG.colors.primary}] uppercase`}>Invoice</h2>
              <p className={modalSubtleTextColor}><strong>Invoice #:</strong> {invoice.invoiceNumber}</p>
              <p className={modalSubtleTextColor}><strong>Date:</strong> {formatDate(invoice.date)}</p>
              <p className={modalSubtleTextColor}><strong>Due Date:</strong> {formatDate(invoice.dueDate)}</p>
            </div>
          </div>

          {/* Customer Details */}
          <div className={`customer-details-pdf mb-8 p-4 ${modalSectionBg} rounded`}>
            <h3 className={`font-semibold text-[${BRAND_CONFIG.colors.primary}] mb-1`}>Bill To:</h3>
            <p className={`font-bold ${modalTextColor} customer-name-pdf`}>{invoice.customer.name}</p>
            <p className={modalSubtleTextColor}>{invoice.customer.address}</p>
            <p className={modalSubtleTextColor}>{invoice.customer.email}</p>
            {invoice.customer.phone && <p className={modalSubtleTextColor}>{invoice.customer.phone}</p>}
          </div>

          {/* Line Items Table */}
          <div className="items-table-container-pdf">
            <table className={`items-table-pdf w-full mb-8 border-collapse`}>
              <thead>
                <tr className="bg-[#004040] text-white">
                  <th className="p-2 text-left font-semibold">Description</th>
                  <th className="p-2 text-right font-semibold">Quantity</th>
                  <th className="p-2 text-right font-semibold">Unit Price</th>
                  <th className="p-2 text-right font-semibold">Total</th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map(item => (
                  <tr key={item.id} className={`border-b ${modalBorderColor}`}>
                    <td className={`p-2 ${modalTextColor}`}>{item.description}</td>
                    <td className={`p-2 text-right ${modalTextColor}`}>{item.quantity}</td>
                    <td className={`p-2 text-right ${modalTextColor}`}>{businessDetails.currencySymbol}{item.unitPrice.toFixed(2)}</td>
                    <td className={`p-2 text-right ${modalTextColor}`}>{businessDetails.currencySymbol}{item.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className={`totals-section-pdf flex justify-end mb-8 totals-container-pdf`}>
            <div className={`w-full md:w-1/2 lg:w-1/3 space-y-2 totals-box-pdf p-4 ${modalSectionBg} rounded`}>
              <div className={`flex justify-between ${modalTextColor}`}><span>Subtotal:</span><span>{businessDetails.currencySymbol}{invoice.subtotal.toFixed(2)}</span></div>
              <div className={`flex justify-between ${modalTextColor}`}><span>Tax ({taxRateToDisplay}%):</span><span>{businessDetails.currencySymbol}{invoice.taxAmount.toFixed(2)}</span></div>
              <div className={`flex justify-between font-bold text-lg border-t pt-2 mt-2 border-[${BRAND_CONFIG.colors.primary}] ${modalTextColor}`}>
                <span>Total Amount Due:</span>
                <span>{businessDetails.currencySymbol}{invoice.totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          {invoice.notes && (
            <div className={`notes-section-pdf mb-4 p-3 ${modalSectionBg} rounded`}>
              <h4 className={`font-semibold text-[${BRAND_CONFIG.colors.primary}] mb-1`}>Notes:</h4>
              <p className={`whitespace-pre-wrap ${modalSubtleTextColor}`}>{invoice.notes}</p>
            </div>
          )}
          <div className={`status-section-pdf text-center font-semibold text-lg p-2 bg-yellow-600/30 text-[${BRAND_CONFIG.colors.primary}] rounded`}>Status: {invoice.status}</div>

          <div className={`footer-text-pdf mt-12 pt-6 border-t ${modalBorderColor} text-center text-xs text-gray-400`}>
            <p>Thank you for your business!</p>
            <p>If you have any questions concerning this invoice, please contact {businessDetails.name} at {businessDetails.email} or {businessDetails.phone}.</p>
            <p className="mt-2 font-bold">{BRAND_CONFIG.slogan}</p>
          </div>
        </div>

        <div className={`mt-6 pt-4 border-t ${modalBorderColor} flex justify-end space-x-3`}>
          <button onClick={onClose} className={BUTTON_SECONDARY_CLASS}>
            Close
          </button>
          <button onClick={handleDownloadPdf} className={`${BUTTON_PRIMARY_CLASS} flex items-center space-x-2`}>
            <DownloadIcon className="w-5 h-5" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};
