'use client';

import { useState } from 'react';
import { loginAsDemo } from '@/lib/actions/auth';
import css from '../../app/page.module.scss';

export default function DemoButton() {
  const [loading, setLoading] = useState(false);

  async function handleDemo() {
    setLoading(true);
    await loginAsDemo();
  }

  return (
    <button className={css.demoBtn} onClick={handleDemo} disabled={loading}>
      {loading ? (
        'Starting Demo...'
      ) : (
        <>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 2L13 8L3 14V2Z" fill="currentColor"/>
          </svg>
          Try Demo — No Sign Up
        </>
      )}
    </button>
  );
}
