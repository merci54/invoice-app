'use client';

import Container from '@/components/Container/Container';
import css from './page.module.scss';
import Link from 'next/link';
import { useState } from 'react';
import { InvoiceForm } from '@/components/InvoiceForm/InvoiceForm';
import { initialInvoice } from '@/types/invoice';
import { createInvoice } from '@/lib/actions/invoice';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function CreateInvoice() {
  const [submitType, setSubmitType] = useState<'Pending' | 'Draft'>('Pending');
  const router = useRouter();

  // Initial Values for Formik
  const initialValues: initialInvoice = {
    billFrom: {
      street: '17 Rue Berthe Morisot',
      city: 'Reims',
      postCode: '51100',
      country: 'France',
    },

    clientName: 'Yaroslav',
    clientEmail: 'yaroslavlit@gmail.com',

    billTo: {
      street: '18 rue Lenina',
      city: 'Paris',
      postCode: '51000',
      country: 'France',
    },

    invoiceDate: '',
    paymentTerms: 1,
    projectDescription: 'Important Invoice',
    items: [
      {
        name: 'Banner Design',
        quantity: 1,
        price: 156,
        total: 156,
      },
    ],
  };

  const handleCreate = async (values: initialInvoice) => {
    const totalAmount = values.items.reduce((sum, item) => sum + item.quantity * item.price, 0);

    await createInvoice(
      {
        ...values,
        items: values.items.map(i => ({
          ...i,
          total: i.quantity * i.price,
        })),
        totalAmount,
      },
      submitType
    );

    toast.success('Invoice created!');
    router.push('/invoices');
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
        <h1 className={css.title}>New Invoice</h1>
        <InvoiceForm initialValues={initialValues} onSubmit={handleCreate} isCreateInvoice />
      </Container>
      <div className={css.buttonPanel}>
        <Link
          className={`${css.buttonPanel__discard} ${css.buttonPanel__button}`}
          href={`/invoices/`}
        >
          Discard
        </Link>

        <button
          className={`${css.buttonPanel__draft} ${css.buttonPanel__button}`}
          type="submit"
          form="invoiceForm"
          onClick={() => setSubmitType('Draft')}
        >
          Save as Draft
        </button>
        <button
          className={`${css.buttonPanel__save} ${css.buttonPanel__button}`}
          type="submit"
          form="invoiceForm"
          onClick={() => setSubmitType('Pending')}
        >
          Save & Send
        </button>
      </div>
    </main>
  );
}
