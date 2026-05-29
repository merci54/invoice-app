import { connectMongoDB } from '@/lib/db/connectMongoDB';
import { Invoice } from '@/lib/models/invoice';
import { Invoice as InvoiceDB } from '@/types/invoice';
import { getCurrentUser } from '@/lib/actions/auth';
import { redirect } from 'next/navigation';
import Container from '@/components/Container/Container';
import InvoiceFormPanel from '@/components/InvoiceFormPanel/InvoiceFormPanel';
import css from './page.module.scss';

interface Props {
  params: Promise<{ id: string }>;
}

// Full-page fallback for /invoices/[id]/edit (direct link / refresh).
// On in-app navigation this route is intercepted and shown as a drawer instead.
export default async function EditPage({ params }: Props) {
  const user = await getCurrentUser();
  if (!user) redirect('/login');

  const { id } = await params;

  await connectMongoDB();
  const invoiceDoc = await Invoice.findOne({ _id: id, userId: user.userId }).lean<InvoiceDB>();

  if (!invoiceDoc) return <p>Not found</p>;

  const invoice: InvoiceDB = JSON.parse(JSON.stringify(invoiceDoc));

  return (
    <main className={css.main}>
      <Container>
        <InvoiceFormPanel mode="edit" invoice={invoice} />
      </Container>
    </main>
  );
}
