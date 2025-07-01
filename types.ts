export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Customer {
  name: string;
  email: string;
  address: string;
  phone?: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  customer: Customer;
  items: LineItem[];
  subtotal: number;
  taxAmount: number;
  totalAmount: number;
  notes?: string;
  status: InvoiceStatus;
  taxRateApplied: number; // Store the tax rate (%) applied to this specific invoice
}

export interface BusinessDetails {
  name: string;
  address: string;
  email: string;
  phone: string;
  logoUrl?: string;
  taxRate: number; // Percentage
  invoicePrefix: string;
  currencySymbol: string;
}

export enum InvoiceStatus {
  DRAFT = 'Draft',
  SENT = 'Sent',
  PAID = 'Paid',
  OVERDUE = 'Overdue',
  CANCELLED = 'Cancelled',
}

export enum AppView {
  HOME = 'Home',
  ABOUT = 'About',
  INVOICE_GENERATOR = 'Invoice Generator', // Renamed from ASSISTANT
  HISTORY = 'Invoice History',
  SETTINGS = 'Settings',
}

// Removed Theme enum

export interface BrandColors {
  primary: string;
  secondary: string;
}

export interface BrandLogo {
  title: string;
  favicon: string;
}

export interface BrandChatbot {
  avatar: string;
  face: string;
}

export interface BrandSocialMedia {
  blog: string;
  linkedin: string;
  instagram: string;
  github: string;
  x: string;
  youtube: string;
}

export interface BrandConfig {
  shortName: string;
  longName: string;
  website: string;
  email: string;
  mobile: string;
  slogan: string;
  colors: BrandColors;
  logo: BrandLogo;
  chatbot: BrandChatbot;
  socialMedia: BrandSocialMedia;
}