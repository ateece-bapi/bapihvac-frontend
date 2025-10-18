import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BAPI HVAC - Building Automation Products',
  description: 'Professional HVAC sensors, transmitters, and building automation equipment from BAPI.',
};

// Layout component for Next.js application
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}