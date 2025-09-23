import type { FC, PropsWithChildren } from 'react';

import styles from './Layout.module.scss';
import { Header } from '@components/Header';

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Header />
      <main>{children}</main>
    </div>
  );
};
