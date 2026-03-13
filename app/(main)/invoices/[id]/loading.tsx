import Container from '@/components/Container/Container';
import css from './loading.module.scss';

export default function InvoiceDetailLoading() {
  return (
    <main className={css.main}>
      <Container>
        <div className={css.back} />

        <div className={css.status}>
          <div className={css.statusText} />
          <div className={css.statusBadge} />
        </div>

        <div className={css.content}>
          <div className={css.titleBlock}>
            <div className={`${css.lineMd}`} style={{ width: '100px' }} />
            <div className={`${css.lineShort}`} style={{ width: '120px' }} />
          </div>

          <div className={css.addressBlock}>
            <div className={css.line} style={{ width: '150px' }} />
            <div className={css.line} style={{ width: '80px' }} />
            <div className={css.line} style={{ width: '60px' }} />
          </div>

          <div className={css.infoRow}>
            <div className={css.infoCol}>
              <div className={css.line} style={{ width: '80px' }} />
              <div className={css.lineMd} style={{ width: '110px' }} />
              <div className={css.line} style={{ width: '80px' }} />
              <div className={css.lineMd} style={{ width: '110px' }} />
            </div>
            <div className={css.infoCol}>
              <div className={css.line} style={{ width: '50px' }} />
              <div className={css.lineMd} style={{ width: '100px' }} />
              <div className={css.line} style={{ width: '120px' }} />
              <div className={css.line} style={{ width: '80px' }} />
            </div>
          </div>

          <div className={css.amountBlock}>
            <div className={css.amountItems}>
              {[1, 2].map((i) => (
                <div key={i} className={css.amountRow}>
                  <div className={css.line} style={{ width: '120px' }} />
                  <div className={css.line} style={{ width: '70px' }} />
                </div>
              ))}
            </div>
            <div className={css.amountTotal}>
              <div className={css.amountTotalLabel} />
              <div className={css.amountTotalValue} />
            </div>
          </div>
        </div>
      </Container>

      <div className={css.buttonPanel}>
        <div className={`${css.btn} ${css.btnEdit}`} />
        <div className={`${css.btn} ${css.btnDelete}`} />
        <div className={`${css.btn} ${css.btnPaid}`} />
      </div>
    </main>
  );
}
