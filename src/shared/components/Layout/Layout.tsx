'use client';

import type { FC, PropsWithChildren } from 'react';

import styles from './Layout.module.scss';
import { Header } from '@components/Header';
import { useQueryParamsStoreInit } from '@/store/RootStore/hooks';

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  useQueryParamsStoreInit();

  return (
    <div className={styles.layout}>
      <Header />
      <main>{children}</main>
    </div>
  );
};
