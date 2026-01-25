export type InvoiceStatus = "Paid" | "Pending" | "Draft";

export interface Invoice {
  _id: string;
  invoiceNumber: string;

  clientName: string;
  clientEmail: string;

  invoiceDate: string; // ISO string
  paymentTerms: number;

  totalAmount: number;
  status: InvoiceStatus;
}

export interface InvoiceCardProps {
  id: string;        
  name: string;      
  date: string;      
  sum: number;       
  status: InvoiceStatus;
}
