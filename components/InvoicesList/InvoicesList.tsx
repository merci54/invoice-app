import css from './InvoicesList.module.scss';
import InvoiceCard from '../InvoiceCard/InvoiceCard';
import { Invoice as InvoiceDB } from '@/types/invoice';
import { connectMongoDB } from '@/lib/db/connectMongoDB';
import { Invoice } from '@/lib/models/invoice';


function mapInvoiceToCard(invoice: InvoiceDB) {
  return {
    id: invoice.invoiceNumber,
    name: invoice.clientName,
    date: `Due ${new Date(invoice.invoiceDate).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })}`,
    sum: invoice.totalAmount,
    status: invoice.status,
  };
}

export default async function InvoicesList() {
    await connectMongoDB();
    const invoices = await Invoice.find().lean<InvoiceDB[]>();
    const cards = invoices.map(mapInvoiceToCard);

    return <ul className={css.list}>
      {cards.map((invoice) => (
        <InvoiceCard key={invoice.id} {...invoice} />
      ))}
    </ul>
}