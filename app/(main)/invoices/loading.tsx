import Container from '@/components/Container/Container';
import css from './loading.module.scss';

export default function InvoicesLoading() {
  return (
    <main className={css.main}>
      <Container>
        <div className={css.top}>
          <div className={css.titleBlock}>
            <div className={css.title} />
            <div className={css.subtitle} />
          </div>
          <div className={css.actions}>
            <div className={css.filterSkeleton} />
            <div className={css.buttonSkeleton} />
          </div>
        </div>

        <div className={css.list}>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={css.card}>
              <div className={css.cardTop}>
                <div className={css.cardId} />
                <div className={css.cardName} />
              </div>
              <div className={css.cardBottom}>
                <div>
                  <div className={css.cardDate} />
                  <div className={css.cardSum} />
                </div>
                <div className={css.cardStatus} />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </main>
  );
}
