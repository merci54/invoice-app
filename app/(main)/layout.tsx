import Header from '@/components/Header/Header';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="app-wrapper">
      <Header />
      {children}
    </div>
  );
}
