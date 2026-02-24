'use client';

import Image from 'next/image';
import css from './Header.module.scss';
import Link from 'next/link';
import { useThemeStore } from '@/lib/stores/themeStore';

export default function Header() {
  const theme = useThemeStore(state => state.theme);
  const toggleTheme = useThemeStore(state => state.toggleTheme);
  return (
    <header className={css.header}>
      <div className={css.wrapper}>
        <Link href={'/invoices'}>
          <div className={css.logoBlock}>
            <div className={css.logoBlock__mask}></div>
            <Image
              className={css.logoBlock__img}
              src={'/icons/logo.svg'}
              alt="logo image"
              width={28}
              height={27.58}
            />
          </div>
        </Link>

        <div className={css.menuBlock}>
          <button className={css.menuBlock__themeIcon} onClick={() => toggleTheme()}>
            {theme === 'light' ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.5016 11.3423C19.2971 11.2912 19.0927 11.3423 18.9137 11.4701C18.2492 12.0324 17.4824 12.4924 16.639 12.7991C15.8466 13.1059 14.9776 13.2592 14.0575 13.2592C11.9872 13.2592 10.0958 12.4158 8.74121 11.0611C7.38658 9.70649 6.54313 7.81512 6.54313 5.74483C6.54313 4.87582 6.69649 4.03237 6.95208 3.26559C7.23323 2.4477 7.64217 1.70649 8.17891 1.06751C8.40895 0.786362 8.35783 0.377416 8.07668 0.147384C7.89776 0.0195887 7.69329 -0.0315295 7.48882 0.0195887C5.31629 0.607448 3.42492 1.91096 2.07029 3.64898C0.766773 5.36144 0 7.48285 0 9.78317C0 12.5691 1.1246 15.0995 2.96486 16.9397C4.80511 18.78 7.3099 19.9046 10.1214 19.9046C12.4728 19.9046 14.6454 19.0867 16.3834 17.732C18.147 16.3519 19.4249 14.3838 19.9617 12.1346C20.0639 11.7768 19.8594 11.419 19.5016 11.3423Z"
                  fill="#7E88C3"
                />
              </svg>
            ) : (
              <svg
                width="20"
                height="20"
                viewBox="0 0 10 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.91783 0C2.20609 0 0 2.20652 0 4.91826C0 7.63 2.20609 9.83652 4.91783 9.83652C7.62913 9.83652 9.83565 7.63043 9.83565 4.91826C9.83565 2.20609 7.62913 0 4.91783 0Z"
                  fill="#858BB2"
                />
              </svg>
            )}
          </button>
          <div className={css.menuBlock__userIcon}>
            <Image alt="avatar image" src={'/images/avatar.jpg'} width={32} height={32} />
          </div>
        </div>
      </div>
    </header>
  );
}
