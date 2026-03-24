import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Lucas Carvalho — AI/ML Engineer',
  description:
    'Software Engineer specializing in Generative AI, RAG systems, and Cloud Architecture.',
  openGraph: {
    title: 'Lucas Carvalho — AI/ML Engineer',
    description:
      'Software Engineer specializing in Generative AI, RAG systems, and Cloud Architecture.',
    url: 'https://carvalhxlucas.pro',
    siteName: 'Lucas Carvalho',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning className={inter.variable}>
      <body className="bg-background text-white font-sans antialiased">{children}</body>
    </html>
  );
}
