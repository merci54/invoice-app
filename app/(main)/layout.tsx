import Header from '@/components/Header/Header';
import DemoBanner from '@/components/DemoBanner/DemoBanner';
import { getSession } from '@/lib/auth/session';

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  const isDemo = session?.isDemo ?? false;

  return (
    <div className="app-wrapper">
      <Header />
      {isDemo && <DemoBanner />}
      {children}
    </div>
  );
}
