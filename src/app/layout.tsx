import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import '@styles/styles.scss';
import { Layout } from '@components/Layout';
import { RootStoreProvider } from '@/store/RootStore/hooks';
import { ReactNode, Suspense } from 'react';
import FavoritesStore from '@/store/RootStore/FavoritesStore';
import Loader from '@components/Loader';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  const favoritesData = await FavoritesStore.fetchFavoritesData();

  return (
    <html lang="en">
      <body className={`${roboto.variable}`}>
        <Suspense fallback={<Loader />}>
          <RootStoreProvider initData={{ favorites: favoritesData }}>
            <Layout>{children}</Layout>
            <ToastContainer position="bottom-left" autoClose={3000} pauseOnHover />
          </RootStoreProvider>
        </Suspense>
      </body>
    </html>
  );
}
