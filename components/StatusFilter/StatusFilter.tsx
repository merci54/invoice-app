'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import css from './StatusFilter.module.scss';
import { InvoiceStatus } from '@/types/invoice';

const STATUSES: InvoiceStatus[] = ['Draft', 'Pending', 'Paid'];

export default function StatusFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const activeFilters = searchParams.getAll('status');

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  function toggleStatus(status: InvoiceStatus) {
    const params = new URLSearchParams(searchParams.toString());
    const current = params.getAll('status');

    params.delete('status');

    if (current.includes(status)) {
      // Remove this status
      current.filter(s => s !== status).forEach(s => params.append('status', s));
    } else {
      // Add this status
      [...current, status].forEach(s => params.append('status', s));
    }

    router.push(`/invoices?${params.toString()}`);
  }

  return (
    <div className={css.filter} ref={ref}>
      <button className={css.filter__button} onClick={() => setOpen(!open)}>
        <p className={css.filter__text}>Filter</p>
        <svg
          className={`${css.filter__icon} ${open ? css.filter__iconOpen : ''}`}
          width="10"
          height="7"
          viewBox="0 0 10 7"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.707031 0.707031L4.93493 4.93493L9.16283 0.707031"
            stroke="#7C5DFA"
            strokeWidth="2"
          />
        </svg>
      </button>

      {open && (
        <div className={css.dropdown}>
          {STATUSES.map(status => (
            <label key={status} className={css.dropdown__item}>
              <input
                type="checkbox"
                checked={activeFilters.includes(status)}
                onChange={() => toggleStatus(status)}
                className={css.dropdown__checkbox}
              />
              <span className={css.dropdown__checkmark}>
                {activeFilters.includes(status) && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.5 4.49976L3.62425 6.62402L8.96954 1.27873" stroke="white" strokeWidth="2"/>
                  </svg>
                )}
              </span>
              <span className={css.dropdown__label}>{status}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
