'use client';

import { logout } from '@/lib/actions/auth';
import css from './DemoBanner.module.scss';

export default function DemoBanner() {
  return (
    <div className={css.banner}>
      <div className={css.banner__content}>
        <span className={css.banner__icon}>🚀</span>
        <span className={css.banner__text}>Demo Mode</span>
      </div>
      <button className={css.banner__exit} onClick={() => logout()}>
        Exit Demo
      </button>
    </div>
  );
}
