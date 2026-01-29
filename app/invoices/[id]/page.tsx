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

  function formatDate(dateString = '2021-08-19T00:00:00.000Z') {
    const date = new Date(dateString);

    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(date);
  }
  function getPaymentDueDateFrom(startDate = '2021-08-19T00:00:00.000Z', days = 1) {
    const date = new Date(startDate);
    date.setUTCDate(date.getUTCDate() + days);

    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      timeZone: 'UTC',
    }).format(date);
  }

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

        <div className={css.content}>
          <div className={css.content__titleBlock}>
            <h2 className={css.title}>
              <span className={css.text}>#</span>
              {invoice?.invoiceNumber}
            </h2>
            <span className={css.text}>{invoice?.projectDescription}</span>
          </div>
          <div className={css.content__billFrom}>
            <p className={css.text}>{invoice?.billFrom.street}</p>
            <p className={css.text}>{invoice?.billFrom.city}</p>
            <p className={css.text}>{invoice?.billFrom.postCode}</p>
            <p className={css.text}>{invoice?.billFrom.country}</p>
          </div>
          <div className={css.content__info}>
            <div className={css.date}>
              <div className={css.date__create}>
                <p className={css.date__text}>Invoice Date</p>
                <p className={css.date__title}>{formatDate(invoice?.invoiceDate)}</p>
              </div>
              <div className={css.date__term}>
                <p className={css.date__text}>Payment Due</p>
                <p className={css.date__title}>
                  {getPaymentDueDateFrom(invoice?.invoiceDate, invoice?.paymentTerms)}
                </p>
              </div>
            </div>
            <div className={css.billTo}>
              <p className={css.billTo__title}>Bill To</p>
              <p className={css.billTo__name}>{invoice?.clientName}</p>
              <div className={css.billTo__info}>
                <p className={css.text}>{invoice?.billTo.street}</p>
                <p className={css.text}>{invoice?.billTo.city}</p>
                <p className={css.text}>{invoice?.billTo.postCode}</p>
                <p className={css.text}>{invoice?.billTo.country}</p>
              </div>
            </div>
          </div>
          <div className={css.content__sentTo}>
            <p className={css.text}>Sent To</p>
            <p className={css.title}>{invoice?.clientEmail}</p>
          </div>
          <div className={css.amount}>
            <div className={css.amount__items}>
              <ul className={css.amount__list}>
                {/* <li className={css.amount__item}>
                  <div className={css.amount__desc}>
                    <p className={css.title}>Banner Design</p>
                    <p className={css.amount__itemPrice}>1 x £ 156.00</p>
                  </div>
                  <p className={css.amount__itemTotalPrice}>£ 156.00</p>
                </li>
                <li className={css.amount__item}>
                  <div className={css.amount__desc}>
                    <p className={css.title}>Banner Design</p>
                    <p className={css.amount__itemPrice}>1 x £ 156.00</p>
                  </div>
                  <p className={css.amount__itemTotalPrice}>£ 156.00</p>
                </li> */}
                {invoice?.items.map(item => (
                  <li key={item.name + 's2b'} className={css.amount__item}>
                    <div className={css.amount__desc}>
                      <p className={css.title}>{item.name}</p>
                      <p className={css.amount__itemPrice}>
                        {item.quantity} x £ {item.price.toFixed(2)}
                      </p>
                    </div>
                    <p className={css.amount__itemTotalPrice}>£ {item.total.toFixed(2)}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className={css.amount__total}>
              <p className={css.amount__totalText}>Grand Total</p>
              <p className={css.amount__totalPrice}>£ {invoice?.totalAmount.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
