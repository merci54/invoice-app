import Container from '@/components/Container/Container';
import css from './page.module.scss';
import Image from 'next/image';

export default function Home() {
  return (
    <main className={css.main}>
      <Container>
        <div className={css.wrapper}>
          <div className={css.settingsBlock}>
            <div className={css.settingsBlock__textBlock}>
              <h1 className={css.settingsBlock__title}>Invoices</h1>
              <p className={css.settingsBlock__total}>7 invoices</p>
            </div>
            <div className={css.featuresBlock}>
              <div className={css.featuresBlock__filters}>
                <p className={css.featuresBlock__filterText}>Filter</p>
                <Image
                  className={css.downArrow}
                  src={'/down.svg'}
                  alt="down icon"
                  width={8.46}
                  height={4.23}
                />
              </div>
              <button className={css.featuresBlock__button}>
                <div className={css.featuresBlock__plus}>
                  <Image src={'/plus.svg'} alt="plus icon" width={10} height={10} />
                </div>
                New
              </button>
            </div>
          </div>
          <ul className={css.settingsBlock__list}>
            <li>#rt3080</li>
            <li>#rt3080</li>
            <li>#rt3080</li>
          </ul>
        </div>
      </Container>
    </main>
  );
}
