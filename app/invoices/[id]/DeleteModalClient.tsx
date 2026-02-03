'use client';

import { useRouter } from 'next/navigation';
import css from './Delete.module.scss';
import Container from '@/components/Container/Container';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { deleteInvoice } from '@/lib/actions/invoice';

interface Props {
  invoiceId: string;
  invoiceNumber: string;
}

export default function DeleteModalClient({ invoiceId, invoiceNumber }: Props) {
  const router = useRouter();

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      router.replace(`/invoices/${invoiceId}`, { scroll: false });
    }
  };
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        router.replace(`/invoices/${invoiceId}`, { scroll: false });
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [router, invoiceId]);

  return createPortal(
    <div onClick={handleBackdropClick} className={css.backdrop} role="dialog" aria-modal="true">
      <Container>
        <div className={css.modal}>
          <h2 className={css.modal__title}>Confirm Deletion</h2>

          <p className={css.modal__text}>
            Are you sure you want to delete invoice #{invoiceNumber}? This action cannot be undone.
          </p>

          <div className={css.modal__actions}>
            <button
              className={`${css.modal__cancel} ${css.button}`}
              onClick={() => router.replace(`/invoices/${invoiceId}`, { scroll: false })}
            >
              Cancel
            </button>

            <button
              onClick={() => deleteInvoice(invoiceId)}
              className={`${css.modal__delete} ${css.button}`}
            >
              Delete
            </button>
          </div>
        </div>
      </Container>
    </div>,
    document.body
  );
}
