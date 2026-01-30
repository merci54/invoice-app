'use client';

import { markInvoiceAsPaid } from '@/lib/actions/invoice';
import css from './PaidButton.module.scss';
import toast from 'react-hot-toast';

interface Props {
  invoiceId: string;
}

export default function PaidButton({ invoiceId }: Props) {
  return (
    <button
      className={css.button}
      onClick={async () => {
        try {
          await markInvoiceAsPaid(invoiceId);
          toast.success('Invoice marked as paid');
        } catch {
          toast.error('Failed to mark invoice as paid');
        }
      }}
    >
      Mark as Paid
    </button>
  );
}
