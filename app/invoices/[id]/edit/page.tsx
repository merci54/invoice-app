import { connectMongoDB } from '@/lib/db/connectMongoDB';
import { Invoice } from '@/lib/models/invoice';
import { Invoice as InvoiceDB } from '@/types/invoice';
import EditPageClient from './EditPage.client';
interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditPage({ params }: Props) {
  const { id } = await params;

  await connectMongoDB();
  const invoiceDoc = await Invoice.findById(id).lean<InvoiceDB>();

  if (!invoiceDoc) return <p>Not found</p>;

  const invoice = {
    ...invoiceDoc,
    _id: invoiceDoc._id.toString(),
  };

  return <EditPageClient invoice={invoice} />;
}
