import Container from '@/components/Container/Container';
import css from './page.module.scss';
import Image from 'next/image';
import NothingPage from '@/components/NothingPage/NothingPage';
import InvoicesList from '@/components/InvoicesList/InvoicesList';

export default function Home() {

  return (
    <main className={css.main}>
      <Container>
        <div className={css.invoices}>
          <div className={css.invoices__top}>
            <div className={css.invoices__info}>
              <h1 className={css.invoices__title}>Invoices</h1>
              <p className={css.invoices__count}>7 invoices</p>
            </div>

            <div className={css.invoices__actions}>
              <button className={css.filter}>
                <p className={css.filter__text}>Filter</p>
                <Image
                  className={css.filter__icon}
                  src={'/down.svg'}
                  alt="down icon"
                  width={10}
                  height={10}
                />
              </button>
              <button className={css.newInvoice}>
                <div className={css.newInvoice__icon}>
                  <Image src={'/plus.svg'} alt="plus icon" width={10} height={10} />
                </div>
                New
              </button>
            </div>
          </div>

          <InvoicesList />
          {/* <NothingPage /> */}
        </div>
      </Container>
    </main>
  );
}
