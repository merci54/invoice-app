import { create } from 'zustand';
import { Invoice as InvoiceDB } from '@/types/invoice';

type DrawerMode = 'create' | 'edit' | null;

interface DrawerStore {
  mode: DrawerMode;
  invoice: InvoiceDB | null;
  openCreate: () => void;
  openEdit: (invoice: InvoiceDB) => void;
  close: () => void;
}

/** Controls the slide-out create/edit invoice drawer. */
export const useDrawerStore = create<DrawerStore>(set => ({
  mode: null,
  invoice: null,
  openCreate: () => set({ mode: 'create', invoice: null }),
  openEdit: invoice => set({ mode: 'edit', invoice }),
  close: () => set({ mode: null, invoice: null }),
}));
