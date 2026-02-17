import { connectMongoDB } from '@/lib/db/connectMongoDB';
import { Invoice } from '@/lib/models/invoice';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditPage({ params }: Props) {
  const { id } = await params;

  await connectMongoDB();

  const invoice = await Invoice.findById(id).lean();

  return <div>edit invoice with id: {invoice?.invoiceNumber}</div>;
}
