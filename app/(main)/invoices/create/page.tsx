import Container from '@/components/Container/Container';
import InvoiceFormPanel from '@/components/InvoiceFormPanel/InvoiceFormPanel';
import css from './page.module.scss';

// Full-page fallback for /invoices/create (direct link / refresh).
// On in-app navigation this route is intercepted and shown as a drawer instead.
export default function CreateInvoicePage() {
  return (
    <main className={css.main}>
      <Container>
        <InvoiceFormPanel mode="create" />
      </Container>
    </main>
  );
}
