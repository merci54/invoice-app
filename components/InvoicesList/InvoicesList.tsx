import css from './InvoicesList.module.scss';
import InvoiceCard from '../InvoiceCard/InvoiceCard';
import { InvoiceCardProps } from '@/types/invoice';
import Link from 'next/link';

interface Props {
  invoices: InvoiceCardProps[];
}

export default function InvoicesList({ invoices }: Props) {
  return (
    <ul className={css.list}>
      {invoices.map(invoice => (
        <Link key={invoice.id} href={`invoices/${invoice.id}`}>
          <InvoiceCard {...invoice} />
        </Link>
      ))}
    </ul>
  );
}
