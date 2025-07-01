
import { LineItem } from '../types';

export const generateInvoiceNumber = (prefix: string = 'INV-'): string => {
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const randomSuffix = Math.random().toString(36).substring(2, 7).toUpperCase(); // 5 random alphanumeric chars
  return `${prefix}${year}${month}${day}-${randomSuffix}`;
};

export const calculateTotals = (items: LineItem[], taxRatePercentage: number): { subtotal: number; taxAmount: number; totalAmount: number } => {
  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const taxAmount = subtotal * (taxRatePercentage / 100);
  const totalAmount = subtotal + taxAmount;
  return { subtotal, taxAmount, totalAmount };
};
    