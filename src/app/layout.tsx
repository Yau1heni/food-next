import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import '@styles/styles.scss';
import { Layout } from '@components/Layout';
import { RootStoreProvider } from '@/store/RootStore/hooks';
import { ReactNode } from 'react';
import RootStore from '@/store/RootStore';

const roboto = Roboto({
  variable: '--font-family',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
  title: 'Food',
  description: 'Choose recipes for your dishes',
};

type RootLayoutProps = Readonly<{ children: ReactNode }>;

export default async function RootLayout({ children }: RootLayoutProps) {
  const store = await RootStore.initOnServer();
  const data = store.serialize();

  return (
    <html lang="en">
      <body className={`${roboto.variable}`}>
        <RootStoreProvider initData={data}>
          <Layout>{children}</Layout>
        </RootStoreProvider>
      </body>
    </html>
  );
}
