'use server';

import { connectMongoDB } from '@/lib/db/connectMongoDB';
import { Invoice } from '@/lib/models/invoice';
import { revalidatePath } from 'next/cache';

export async function markInvoiceAsPaid(invoiceId: string) {
  await connectMongoDB();

  await Invoice.findByIdAndUpdate(invoiceId, {
    status: 'Paid',
  });

  revalidatePath('/invoices');
  revalidatePath(`/invoices/${invoiceId}`);
}
