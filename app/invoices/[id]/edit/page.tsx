import Container from '@/components/Container/Container';
import { connectMongoDB } from '@/lib/db/connectMongoDB';
import { Invoice } from '@/lib/models/invoice';
import css from './page.module.scss';
import Link from 'next/link';
import { Invoice as InvoiceDB } from '@/types/invoice';
interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditPage({ params }: Props) {
  const { id } = await params;

  await connectMongoDB();

  const invoice = await Invoice.findById(id).lean<InvoiceDB>();

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
        >
          Save as Draft
        </button>
        <button
          className={`${css.buttonPanel__save} ${css.buttonPanel__button}`}
          type="submit"
          form="invoiceForm"
        >
          Save & Send
        </button>
      </div>
    </main>
  );
}
