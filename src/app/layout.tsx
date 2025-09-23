import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import '@styles/styles.scss';
import { Layout } from '@components/Layout';

const roboto = Roboto({
  variable: '--font-family',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
  title: 'Food',
  description: 'Choose recipes for your dishes',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable}`}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
