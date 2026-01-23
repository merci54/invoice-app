import Container from '@/components/Container/Container';
import css from './page.module.scss';
import Image from 'next/image';

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

          <ul className={css.invoices__list}>
            <li className={css.invoice}>
              <div className={css.invoice__top}>
                <h2 className={css.invoice__id}>#RT3080</h2>
                <p className={css.invoice__name}>Jensen Huang</p>
              </div>
              <div className={css.invoice__low}>
                <div className={css.amount}>
                  <p className={css.amount__date}>Due  19 Aug 2026</p>
                  <p className={css.amount__sum}>
                    £ 1,800.90
                  </p>

                </div>
                <div className={css.status}>
                  <Image className={css.status__icon} alt='status icon' width={8} height={8} src={'/status.svg'} />
                  <span className={css.status__text}>Paid</span>
                </div>
              </div>
            </li>
            <li className={css.invoice}>
              <div className={css.invoice__top}>
                <h2 className={css.invoice__id}>#RT3080</h2>
                <p className={css.invoice__name}>Jensen Huang</p>
              </div>
              <div className={css.invoice__low}>
                <div className={css.amount}>
                  <p className={css.amount__date}>Due  19 Aug 2026</p>
                  <p className={css.amount__sum}>
                    £ 1,800.90
                  </p>

                </div>
                <div className={css.status}>
                  <Image className={css.status__icon} alt='status icon' width={8} height={8} src={'/status.svg'} />
                  <span className={css.status__text}>Paid</span>
                </div>
              </div>
            </li>
            <li className={css.invoice}>
              <div className={css.invoice__top}>
                <h2 className={css.invoice__id}>#RT3080</h2>
                <p className={css.invoice__name}>Jensen Huang</p>
              </div>
              <div className={css.invoice__low}>
                <div className={css.amount}>
                  <p className={css.amount__date}>Due  19 Aug 2026</p>
                  <p className={css.amount__sum}>
                    £ 1,800.90
                  </p>

                </div>
                <div className={css.status}>
                  <Image className={css.status__icon} alt='status icon' width={8} height={8} src={'/status.svg'} />
                  <span className={css.status__text}>Paid</span>
                </div>
              </div>
            </li>
            <li className={css.invoice}>
              <div className={css.invoice__top}>
                <h2 className={css.invoice__id}>#RT3080</h2>
                <p className={css.invoice__name}>Jensen Huang</p>
              </div>
              <div className={css.invoice__low}>
                <div className={css.amount}>
                  <p className={css.amount__date}>Due  19 Aug 2026</p>
                  <p className={css.amount__sum}>
                    £ 1,800.90
                  </p>

                </div>
                <div className={css.status}>
                  <Image className={css.status__icon} alt='status icon' width={8} height={8} src={'/status.svg'} />
                  <span className={css.status__text}>Paid</span>
                </div>
              </div>
            </li>
           
          </ul>
        </div>
      </Container>
    </main>
  );
}
