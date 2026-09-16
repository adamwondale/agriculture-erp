import type { Metadata } from 'next';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'Agriculture ERP & Farm Management System',
  description: 'Enterprise agricultural resource planning and digital agronomy platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50">{children}</body>
    </html>
  );
}
