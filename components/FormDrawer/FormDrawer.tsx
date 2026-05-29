'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './FormDrawer.module.scss';

interface Props {
  /** Drives the slide-in (true) / slide-out (false) transition. */
  open: boolean;
  /** Called on scrim click or Escape. */
  onClose: () => void;
  children: React.ReactNode;
}

export default function FormDrawer({ open, onClose, children }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const onBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return createPortal(
    <div
      className={`${css.backdrop} ${open ? css.open : ''}`}
      onClick={onBackdrop}
      role="dialog"
      aria-modal="true"
    >
      <div className={css.drawer}>{children}</div>
    </div>,
    document.body
  );
}
