import { InvoiceCardProps } from '@/types/invoice';
import css from './InvoiceCard.module.scss';

export default function InvoiceCard({ invoiceNumber, name, date, sum, status }: InvoiceCardProps) {
  return (
    <li className={css.invoice}>
      <div className={css.invoice__top}>
        <h2 className={css.invoice__id}>
          <span className={css.invoice__hash}>#</span>
          {invoiceNumber}
        </h2>
        <p className={css.invoice__name}>{name}</p>
      </div>
      <div className={css.invoice__low}>
        <div className={css.amount}>
          <p className={css.amount__date}>{date}</p>
          <p className={css.amount__sum}>£ {sum.toFixed(2)}</p>
        </div>
        <div className={`${css.status} ${css[`status__${status.toLowerCase()}`]}`}>
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
                status === 'Paid'
                  ? '#33D69F'
                  : status === 'Draft'
                    ? '#373B53'
                    : status === 'Pending'
                      ? '#FF8F00'
                      : '#62005c'
              }
            />
          </svg>

          <span className={css.status__text}>{status}</span>
        </div>
      </div>
    </li>
  );
}
