'use client';

import styles from './Header.module.scss';
import { useCallback, useState } from 'react';
import { Container } from '@components/Container';
import Text from '@components/Text';
import { Burger, HeaderModal } from '@components/Header';
import Link from 'next/link';
import LogoIcon from '@components/icons/LogoIcon';
import { Navigation } from '@components/Navigation';
import LikeIcon from '@components/icons/LikeIcon';
import UserIcon from '@components/icons/UserIcon';
import { routes } from '@config/routes';

export const Header = () => {
  const [open, setOpen] = useState(false);

  const onOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const onClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.headerContent}>
          <Burger onOpen={onOpen} />
          <HeaderModal open={open} onClose={onClose} />
          <div className={styles.navGroup}>
            <Link href={routes.main.mask} className={styles.logo} aria-label={'Food Client logo'}>
              <LogoIcon />
              <Text tag={'h1'} view={'p-20'} weight={'bold'}>
                Food Client
              </Text>
            </Link>
            <Navigation />
          </div>
          <div className={styles.controls}>
            <LikeIcon />
            <UserIcon />
          </div>
        </div>
      </Container>
    </header>
  );
};
