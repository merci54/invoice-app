export type InvoiceStatus = 'Paid' | 'Pending' | 'Draft';

export interface billProps {
  street: string;
  city: string;
  postCode: string;
  country: string;
}

export interface itemProps {
  name: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Invoice {
  _id: string;
  invoiceNumber: string;
  billFrom: billProps;

  clientName: string;
  clientEmail: string;

  billTo: billProps;

  invoiceDate: string;
  paymentTerms: number;
  projectDescription: string;
  items: itemProps[];

  totalAmount: number;
  status: InvoiceStatus;
}

export interface CreateInvoiceProps {
  billFrom: billProps;

  clientName: string;
  clientEmail: string;

  billTo: billProps;

  invoiceDate: string;
  paymentTerms: number;
  projectDescription: string;
  items: itemProps[];

  totalAmount: number;
  status?: InvoiceStatus;
}

export interface InvoiceCardProps {
  id: string;
  invoiceNumber: string;
  name: string;
  date: string;
  sum: number;
  status: InvoiceStatus;
}

export type initialInvoice = Omit<Invoice, '_id' | 'status' | 'totalAmount' | 'invoiceNumber'>;
