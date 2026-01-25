import css from "./InvoicesList.module.scss";
import InvoiceCard from "../InvoiceCard/InvoiceCard";
import { InvoiceCardProps } from "@/types/invoice";

interface Props {
  invoices: InvoiceCardProps[];
}

export default function InvoicesList({ invoices }: Props) {
  return (
    <ul className={css.list}>
      {invoices.map((invoice) => (
        <InvoiceCard key={invoice.id} {...invoice} />
      ))}
    </ul>
  );
}