'use server';

import { connectMongoDB } from '@/lib/db/connectMongoDB';
import { Invoice } from '@/lib/models/invoice';
import { CreateInvoiceProps, InvoiceStatus } from '@/types/invoice';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getCurrentUser } from './auth';

export async function markInvoiceAsPaid(invoiceId: string) {
  const user = await getCurrentUser();
  if (!user) redirect('/login');

  await connectMongoDB();

  await Invoice.findOneAndUpdate(
    { _id: invoiceId, userId: user.userId },
    { status: 'Paid' }
  );

  revalidatePath('/invoices');
  revalidatePath(`/invoices/${invoiceId}`);
}

export async function deleteInvoice(invoiceId: string) {
  const user = await getCurrentUser();
  if (!user) redirect('/login');

  await connectMongoDB();

  await Invoice.findOneAndDelete({ _id: invoiceId, userId: user.userId });

  revalidatePath('/invoices');
  redirect('/invoices');
}

export async function createInvoice(
  invoice: CreateInvoiceProps,
  status: InvoiceStatus = 'Pending'
) {
  const user = await getCurrentUser();
  if (!user) redirect('/login');

  await connectMongoDB();

  await Invoice.create({
    ...invoice,
    userId: user.userId,
    status,
  });

  revalidatePath('/invoices');
}

export async function editInvoice(invoiceId: string, updatedInvoice: CreateInvoiceProps) {
  const user = await getCurrentUser();
  if (!user) redirect('/login');

  await connectMongoDB();

  await Invoice.findOneAndUpdate(
    { _id: invoiceId, userId: user.userId },
    updatedInvoice,
    { new: true }
  );

  revalidatePath('/invoices');
}
