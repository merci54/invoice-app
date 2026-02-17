'use client';

import Container from '@/components/Container/Container';
import css from './page.module.scss';
import Link from 'next/link';
import { useState } from 'react';
import { InvoiceForm } from '@/components/InvoiceForm/InvoiceForm';

export default function CreateInvoice() {
  const [submitType, setSubmitType] = useState<'Pending' | 'Draft'>('Pending');

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
        <InvoiceForm submitType={submitType} isCreateInvoice />
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
