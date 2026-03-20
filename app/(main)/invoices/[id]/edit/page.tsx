import { connectMongoDB } from '@/lib/db/connectMongoDB';
import { Invoice } from '@/lib/models/invoice';
import { Invoice as InvoiceDB } from '@/types/invoice';
import EditPageClient from './EditPage.client';
import { getCurrentUser } from '@/lib/actions/auth';
import { redirect } from 'next/navigation';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditPage({ params }: Props) {
  const user = await getCurrentUser();
  if (!user) redirect('/login');

  const { id } = await params;

  await connectMongoDB();
  const invoiceDoc = await Invoice.findOne({ _id: id, userId: user.userId }).lean<InvoiceDB>();

  if (!invoiceDoc) return <p>Not found</p>;

  const invoice: InvoiceDB = JSON.parse(JSON.stringify(invoiceDoc));

  return <EditPageClient invoice={invoice} />;
}
