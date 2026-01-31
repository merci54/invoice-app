import Container from '@/components/Container/Container';
import css from './page.module.scss';
import Image from 'next/image';
import InvoicesList from '@/components/InvoicesList/InvoicesList';
import { connectMongoDB } from '@/lib/db/connectMongoDB';
import { Invoice } from '@/lib/models/invoice';
import NothingPage from '@/components/NothingPage/NothingPage';
import { Invoice as InvoiceDB } from '@/types/invoice';
import { formatDate } from '@/lib/utils/date';

function mapInvoiceToCard(invoice: InvoiceDB) {
  return {
    invoiceNumber: invoice.invoiceNumber,
    id: invoice._id,
    name: invoice.clientName,
    date: `Due ${formatDate(invoice.invoiceDate)}`,
    sum: invoice.totalAmount,
    status: invoice.status,
  };
}

export default async function InvoicesPage() {
  await connectMongoDB();

  const invoices = await Invoice.find().lean<InvoiceDB[]>();
  const cards = invoices.map(mapInvoiceToCard);
  const hasInvoices = cards.length > 0;

  return (
    <main className={css.main}>
      <Container>
        <div className={css.invoices}>
          <div className={css.invoices__top}>
            <div className={css.invoices__info}>
              <h1 className={css.invoices__title}>Invoices</h1>
              <p className={css.invoices__count}>
                {cards.length > 0 ? cards.length : 'No'}{' '}
                {cards.length === 1 ? 'Invoice' : 'Invoices'}
              </p>
            </div>

            <div className={css.invoices__actions}>
              <button className={css.filter}>
                <p className={css.filter__text}>Filter</p>
                <svg
                  className={css.filter__icon}
                  width="10"
                  height="7"
                  viewBox="0 0 10 7"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.707031 0.707031L4.93493 4.93493L9.16283 0.707031"
                    stroke="#7C5DFA"
                    strokeWidth="2"
                  />
                </svg>
              </button>
              <button className={css.newInvoice}>
                <div className={css.newInvoice__icon}>
                  <Image src={'/icons/plus.svg'} alt="plus icon" width={10} height={10} />
                </div>
                New
              </button>
            </div>
          </div>

          {hasInvoices ? <InvoicesList invoices={cards} /> : <NothingPage />}
        </div>
      </Container>
    </main>
  );
}
