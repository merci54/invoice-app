'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { InvoiceForm } from '@/components/InvoiceForm/InvoiceForm';
import { createInvoice, editInvoice } from '@/lib/actions/invoice';
import { initialInvoice, Invoice as InvoiceDB } from '@/types/invoice';
import css from './InvoiceFormPanel.module.scss';

const EMPTY_INVOICE: initialInvoice = {
  billFrom: { street: '', city: '', postCode: '', country: '' },
  clientName: '',
  clientEmail: '',
  billTo: { street: '', city: '', postCode: '', country: '' },
  invoiceDate: '',
  paymentTerms: 1,
  projectDescription: '',
  items: [{ name: '', quantity: 1, price: 0, total: 0 }],
};

interface Props {
  mode: 'create' | 'edit';
  invoice?: InvoiceDB;
  /** Provided in drawer mode — closes the drawer (Discard/Cancel). */
  onClose?: () => void;
  /** Provided in drawer mode — called after a successful submit. */
  onSubmitted?: () => void;
}

/**
 * Shared form body for both creating and editing an invoice.
 * Used by the full-page routes AND the slide-out drawer (intercepting routes).
 * All navigation uses router.push to the underlying page — in the drawer this
 * leaves the intercepted URL and closes the drawer; on a full page it navigates.
 */
export default function InvoiceFormPanel({ mode, invoice, onClose, onSubmitted }: Props) {
  const router = useRouter();
  const [submitType, setSubmitType] = useState<'Pending' | 'Draft'>('Pending');

  const isCreate = mode === 'create';
  const initialValues: initialInvoice = isCreate ? EMPTY_INVOICE : (invoice as initialInvoice);
  const closeHref = isCreate ? '/invoices' : `/invoices/${invoice?._id}`;

  const handleSubmit = async (values: initialInvoice) => {
    const totalAmount = values.items.reduce((sum, item) => sum + item.quantity * item.price, 0);
    const payload = {
      ...values,
      items: values.items.map(i => ({ ...i, total: i.quantity * i.price })),
      totalAmount,
    };

    if (isCreate) {
      await createInvoice(payload, submitType);
      toast.success('Invoice created!');
    } else {
      await editInvoice(invoice!._id, payload);
      toast.success('Invoice updated!');
    }

    // Drawer mode: close + refresh the underlying page. Full page: navigate.
    if (onSubmitted) onSubmitted();
    else router.push(closeHref);
  };

  return (
    <div className={css.panel}>
      {/* Back link — shown on mobile only (the drawer closes via scrim/buttons) */}
      <Link href={closeHref} className={css.back}>
        <svg
          className={css.back__icon}
          width="5"
          height="10"
          viewBox="0 0 5 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M4.22778 0.707031L-0.000118256 4.93493L4.22778 9.16283" stroke="#7C5DFA" strokeWidth="2" />
        </svg>
        <span className={css.back__link}>Go back</span>
      </Link>

      <h1 className={css.title}>
        {isCreate ? (
          'New Invoice'
        ) : (
          <>
            Edit <span className={css.title__hash}>#</span>
            {invoice?.invoiceNumber}
          </>
        )}
      </h1>

      <InvoiceForm initialValues={initialValues} onSubmit={handleSubmit} isCreateInvoice={isCreate} />

      <div className={css.footer}>
        {isCreate ? (
          <>
            {onClose ? (
              <button type="button" className={`${css.btn} ${css.btn__discard}`} onClick={onClose}>
                Discard
              </button>
            ) : (
              <Link className={`${css.btn} ${css.btn__discard}`} href={closeHref}>
                Discard
              </Link>
            )}
            <button
              className={`${css.btn} ${css.btn__draft}`}
              type="submit"
              form="invoiceForm"
              onClick={() => setSubmitType('Draft')}
            >
              Save as Draft
            </button>
            <button
              className={`${css.btn} ${css.btn__save}`}
              type="submit"
              form="invoiceForm"
              onClick={() => setSubmitType('Pending')}
            >
              Save &amp; Send
            </button>
          </>
        ) : (
          <>
            {onClose ? (
              <button type="button" className={`${css.btn} ${css.btn__discard}`} onClick={onClose}>
                Cancel
              </button>
            ) : (
              <Link className={`${css.btn} ${css.btn__discard}`} href={closeHref}>
                Cancel
              </Link>
            )}
            <button className={`${css.btn} ${css.btn__save}`} type="submit" form="invoiceForm">
              Save Changes
            </button>
          </>
        )}
      </div>
    </div>
  );
}
