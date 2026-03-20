import Container from '@/components/Container/Container';
import css from './page.module.scss';
import Image from 'next/image';
import InvoicesList from '@/components/InvoicesList/InvoicesList';
import { connectMongoDB } from '@/lib/db/connectMongoDB';
import { Invoice } from '@/lib/models/invoice';
import NothingPage from '@/components/NothingPage/NothingPage';
import { Invoice as InvoiceDB, InvoiceStatus } from '@/types/invoice';
import { formatDate } from '@/lib/utils/date';
import Link from 'next/link';
import { getCurrentUser } from '@/lib/actions/auth';
import { redirect } from 'next/navigation';
import StatusFilter from '@/components/StatusFilter/StatusFilter';

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

const VALID_STATUSES: InvoiceStatus[] = ['Draft', 'Pending', 'Paid'];

interface Props {
  searchParams: Promise<{ status?: string | string[] }>;
}

export default async function InvoicesPage({ searchParams }: Props) {
  const user = await getCurrentUser();
  if (!user) redirect('/login');

  await connectMongoDB();

  // Parse status filters from URL
  const params = await searchParams;
  const rawStatus = params.status;
  const statusFilters: InvoiceStatus[] = (
    Array.isArray(rawStatus) ? rawStatus : rawStatus ? [rawStatus] : []
  ).filter((s): s is InvoiceStatus => VALID_STATUSES.includes(s as InvoiceStatus));

  // Build query
  const query: Record<string, unknown> = { userId: user.userId };
  if (statusFilters.length > 0) {
    query.status = { $in: statusFilters };
  }

  const invoices = await Invoice.find(query).sort({ createdAt: -1 }).lean<InvoiceDB[]>();
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
              <StatusFilter />
              <Link href={'/invoices/create'} className={css.newInvoice}>
                <div className={css.newInvoice__icon}>
                  <Image src={'/icons/plus.svg'} alt="plus icon" width={10} height={10} />
                </div>
                New
              </Link>
            </div>
          </div>

          {hasInvoices ? <InvoicesList invoices={cards} /> : <NothingPage />}
        </div>
      </Container>
    </main>
  );
}
