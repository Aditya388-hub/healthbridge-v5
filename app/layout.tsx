import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { AuthProvider } from '@/lib/auth';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Project HealthBridge',
  description: 'Bridging the gap between reliable medical knowledge and everyday understanding.',
  metadataBase: new URL('https://www.projecthealthbridge.com'), // Configured for production
  openGraph: {
    title: 'Project HealthBridge',
    description: 'Bridging the gap between reliable medical knowledge and everyday understanding.',
    url: 'https://www.projecthealthbridge.com',
    siteName: 'Project HealthBridge',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          <main className="main-content">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
