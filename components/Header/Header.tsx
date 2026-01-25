import Image from 'next/image';
import css from './Header.module.scss';

export default function Header() {
  return (
    <header className={css.header}>
      <div className={css.wrapper}>
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
        <div className={css.menuBlock}>
          <button className={css.menuBlock__themeIcon}>
            <Image
              className={css.iconWrapper__icon}
              src={'/icons/moon.svg'}
              alt="moon icon"
              width={20}
              height={20}
            />
          </button>
          <div className={css.menuBlock__userIcon}>
            <Image alt="avatar image" src={'/images/avatar.jpg'} width={32} height={32} />
          </div>
        </div>
      </div>
    </header>
  );
}
