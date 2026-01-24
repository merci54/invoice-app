export interface InvoiceProps {
    id: string;
    name: string;
    date: string;
    sum: string;
    status: 'Paid' | 'Pending' | 'Draft';
}