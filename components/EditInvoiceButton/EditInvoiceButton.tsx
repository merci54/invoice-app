'use client';

import Link from 'next/link';
import { useDrawerStore } from '@/lib/stores/drawerStore';
import { Invoice as InvoiceDB } from '@/types/invoice';

interface Props {
  invoice: InvoiceDB;
  className?: string;
}

export default function EditInvoiceButton({ invoice, className }: Props) {
  const openEdit = useDrawerStore(s => s.openEdit);

  // Real link (works on direct nav) but opens the edit drawer on click,
  // reusing the invoice already loaded by the page (no refetch).
  return (
    <Link
      href={`/invoices/${invoice._id}/edit`}
      className={className}
      onClick={e => {
        e.preventDefault();
        openEdit(invoice);
      }}
    >
      Edit
    </Link>
  );
}
