import type { Metadata } from 'next';
import { League_Spartan } from 'next/font/google';
import './globals.scss';
import 'modern-normalize';
import { Toaster } from 'react-hot-toast';
import ThemeProvider from '@/components/ThemeProvider/ThemeProvider';

const spartan = League_Spartan({
  variable: '--font-spartan',
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Invoice App',
  description: 'Create, manage, and track your invoices with ease.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('theme-storage');
                  var theme = stored ? JSON.parse(stored).state.theme : 'light';
                  document.documentElement.classList.add(theme === 'dark' ? 'dark' : 'light');
                } catch (e) {
                  document.documentElement.classList.add('light');
                }
              })();
            `,
          }}
        />
      </head>
      <body className={spartan.variable}>
        <ThemeProvider>
          <div>
            <Toaster />
          </div>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

