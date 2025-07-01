import React from 'react';
import { Invoice, InvoiceStatus } from '../types';
import { CARD_CLASS, BRAND_CONFIG } from '../constants';
import { EyeIcon, PencilSquareIcon, TrashIcon } from './icons/ActionIcons';


interface InvoiceHistoryProps {
  invoices: Invoice[];
  onView: (invoice: Invoice) => void;
  onEdit: (invoice: Invoice) => void;
  onDelete: (invoiceId: string) => void;
  currencySymbol: string;
}

export const InvoiceHistory: React.FC<InvoiceHistoryProps> = ({ invoices, onView, onEdit, onDelete, currencySymbol }) => {
  
  const getStatusColor = (status: InvoiceStatus) => {
    // Adjusted for static dark theme, these are effectively the dark mode styles from before
    switch (status) {
      case InvoiceStatus.PAID:
        return 'bg-green-700/50 text-green-300';
      case InvoiceStatus.OVERDUE:
        return 'bg-red-700/50 text-red-300';
      case InvoiceStatus.SENT:
        return 'bg-blue-700/50 text-blue-300';
      case InvoiceStatus.DRAFT: 
        return `bg-yellow-600/30 text-yellow-300`;
      case InvoiceStatus.CANCELLED:
        return 'bg-gray-600/50 text-gray-400';
      default:
        return 'bg-gray-500/50 text-gray-300';
    }
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (invoices.length === 0) {
    return (
      <div className={`${CARD_CLASS} text-center py-12`}>
        {/* Removed image */}
        <h2 className={`text-2xl font-semibold text-[${BRAND_CONFIG.colors.primary}] mb-2`}>No Invoices Yet!</h2>
        <p className="text-gray-400">Start by creating your first invoice from the Invoice Generator page.</p>
      </div>
    );
  }

  return (
    <div className={`${CARD_CLASS}`}>
      <h2 className={`text-3xl font-bold text-[${BRAND_CONFIG.colors.primary}] border-b-2 border-[${BRAND_CONFIG.colors.primary}] pb-2 mb-6`}>Invoice History</h2>
      <div className="overflow-x-auto">
        <table className="w-full min-w-max text-left">
          <thead className="border-b border-gray-700">
            <tr className="text-gray-300">
              <th className="p-3">Inv. #</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Date</th>
              <th className="p-3">Due Date</th>
              <th className="p-3 text-right">Amount</th>
              <th className="p-3 text-center">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(invoice => (
              <tr key={invoice.id} className="border-b border-gray-700 hover:bg-gray-700/70 transition-colors">
                <td className="p-3 font-medium text-gray-200">{invoice.invoiceNumber}</td>
                <td className="p-3 text-gray-300">{invoice.customer.name}</td>
                <td className="p-3 text-gray-300">{formatDate(invoice.date)}</td>
                <td className="p-3 text-gray-300">{formatDate(invoice.dueDate)}</td>
                <td className="p-3 text-right font-semibold text-gray-200">{currencySymbol}{invoice.totalAmount.toFixed(2)}</td>
                <td className="p-3 text-center">
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(invoice.status)}`}>
                    {invoice.status}
                  </span>
                </td>
                <td className="p-3 text-center">
                  <div className="flex justify-center space-x-2">
                    <button onClick={() => onView(invoice)} title="View Invoice" className={`text-[${BRAND_CONFIG.colors.primary}] hover:text-yellow-300 p-1 rounded-full hover:bg-gray-600 transition-colors`}>
                      <EyeIcon className="w-5 h-5" />
                    </button>
                    <button onClick={() => onEdit(invoice)} title="Edit Invoice" className="text-blue-400 hover:text-blue-300 p-1 rounded-full hover:bg-gray-600 transition-colors">
                      <PencilSquareIcon className="w-5 h-5" />
                    </button>
                    <button onClick={() => onDelete(invoice.id)} title="Delete Invoice" className="text-red-400 hover:text-red-300 p-1 rounded-full hover:bg-gray-600 transition-colors">
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};