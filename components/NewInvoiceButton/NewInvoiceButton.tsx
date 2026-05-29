'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useDrawerStore } from '@/lib/stores/drawerStore';

interface Props {
  // Scoped class names passed in from the page that owns the styling.
  classes: { root: string; icon: string; label: string };
}

export default function NewInvoiceButton({ classes }: Props) {
  const openCreate = useDrawerStore(s => s.openCreate);

  // Real link (works on direct nav / right-click) but opens the drawer on click.
  return (
    <Link
      href="/invoices/create"
      className={classes.root}
      onClick={e => {
        e.preventDefault();
        openCreate();
      }}
    >
      <span className={classes.icon}>
        <Image src={'/icons/plus.svg'} alt="plus icon" width={10} height={10} />
      </span>
      New<span className={classes.label}> Invoice</span>
    </Link>
  );
}
