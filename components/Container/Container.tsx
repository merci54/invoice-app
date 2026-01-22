import { ReactNode } from 'react';
import css from './Container.module.scss';

interface Container {
  children: ReactNode;
}

export default function Container({ children }: Container) {
  return <div className={css.container}>{children}</div>;
}
