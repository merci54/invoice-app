import { connectMongoDB } from '@/lib/db/connectMongoDB';
import { Invoice } from '@/lib/models/invoice';
import { Invoice as InvoiceDB } from '@/types/invoice';
import css from './page.module.scss';
import Container from '@/components/Container/Container';
import Link from 'next/link';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function SingleInvoicePage({ params }: Props) {
  const { id } = await params;
  await connectMongoDB();
  const invoice = await Invoice.findById(id).lean<InvoiceDB>();

  return (
    <main className={css.main}>
      <Container>
        <Link href={'/invoices'}>
          <div className={css.back}>
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
            <span className={css.back__link}>Go back</span>
          </div>
        </Link>

        <div className={css.status}>
          <span className={css.status__text}>Status</span>
          <div
            className={`${css.status__badge} ${css[`status__${invoice?.status.toLowerCase()}`]}`}
          >
            <svg
              width="8"
              height="8"
              viewBox="0 0 8 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                opacity="0.8"
                cx="4"
                cy="4"
                r="4"
                fill={
                  invoice?.status === 'Paid'
                    ? '#33D69F'
                    : invoice?.status === 'Draft'
                      ? '#373B53'
                      : invoice?.status === 'Pending'
                        ? '#FF8F00'
                        : '#62005c'
                }
              />
            </svg>

            <span className={css.status__st}>{invoice?.status}</span>
          </div>
        </div>

        <div className={css.invoice}>
          <h2 className={css.invoice__id}>
            <span className={css.invoice__hash}>#</span>
            {invoice?.invoiceNumber}
          </h2>
          <span className={css.invoice__text}>{invoice?.projectDescription}</span>

          <span>{invoice?.billFrom.street}</span>
          <span>{invoice?.billFrom.city}</span>
          <span>{invoice?.billFrom.postCode}</span>
          <span>{invoice?.billFrom.country}</span>
        </div>
      </Container>
    </main>
  );
}
