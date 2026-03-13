'use client';

import { InvoiceForm } from '@/components/InvoiceForm/InvoiceForm';
import { editInvoice } from '@/lib/actions/invoice';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { initialInvoice, Invoice as InvoiceDB } from '@/types/invoice';
import css from './page.module.scss';
import Container from '@/components/Container/Container';
import Link from 'next/link';

export default function EditPageClient({ invoice }: { invoice: InvoiceDB }) {
  const router = useRouter();

  const handleEdit = async (values: initialInvoice) => {
    const totalAmount = values.items.reduce((sum, item) => sum + item.quantity * item.price, 0);

    await editInvoice(invoice._id, {
      ...values,
      items: values.items.map(i => ({
        ...i,
        total: i.quantity * i.price,
      })),
      totalAmount,
    });

    toast.success('Invoice updated!');
    router.push(`/invoices/${invoice._id}`);
  };

  return (
    <main className={css.main}>
      <Container>
        <div className={css.back}>
          <Link href={'/invoices'}>
            <svg
              className={css.back__icon}
              width="5"
              height="10"
              viewBox="0 0 5 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.22778 0.707031L-0.000118256 4.93493L4.22778 9.16283"
                stroke="#7C5DFA"
                strokeWidth="2"
              />
            </svg>
          </Link>
          <Link href={'/invoices'}>
            <span className={css.back__link}>Go back</span>
          </Link>
        </div>
        <h1 className={css.title}>
          Edit <span>#</span>
          {invoice?.invoiceNumber}
        </h1>
        <InvoiceForm initialValues={invoice} onSubmit={handleEdit} />
      </Container>
      <div className={css.buttonPanel}>
        <Link
          className={`${css.buttonPanel__discard} ${css.buttonPanel__button}`}
          href={`/invoices/${invoice?._id}`}
        >
          Cancel
        </Link>

        <button
          className={`${css.buttonPanel__save} ${css.buttonPanel__button}`}
          type="submit"
          form="invoiceForm"
        >
          Save Changes
        </button>
      </div>
    </main>
  );
}
