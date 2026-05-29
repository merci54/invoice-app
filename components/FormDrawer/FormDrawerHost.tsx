'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDrawerStore } from '@/lib/stores/drawerStore';
import FormDrawer from './FormDrawer';
import InvoiceFormPanel from '@/components/InvoiceFormPanel/InvoiceFormPanel';

/**
 * Mounted once in the main layout. Renders the create/edit invoice drawer
 * whenever the drawer store is open, and orchestrates the slide-in/out animation.
 */
export default function FormDrawerHost() {
  const mode = useDrawerStore(s => s.mode);
  const invoice = useDrawerStore(s => s.invoice);
  const storeClose = useDrawerStore(s => s.close);
  const router = useRouter();

  const [visible, setVisible] = useState(false);

  // When a drawer opens, flip to visible one frame later so the entry transition
  // runs. `visible` is reset to false by close() before the store clears, so the
  // next open always animates in.
  useEffect(() => {
    if (!mode) return;
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, [mode]);

  // Slide out, then clear the store (which unmounts the drawer).
  const close = useCallback(() => {
    setVisible(false);
    window.setTimeout(() => storeClose(), 280);
  }, [storeClose]);

  if (!mode) return null;

  return (
    <FormDrawer open={visible} onClose={close}>
      <InvoiceFormPanel
        mode={mode}
        invoice={invoice ?? undefined}
        onClose={close}
        onSubmitted={() => {
          close();
          router.refresh();
        }}
      />
    </FormDrawer>
  );
}
