'use client';

import styles from './Header.module.scss';
import { useCallback, useState } from 'react';
import { Container } from '@components/Container';
import Text from '@components/Text';
import { Burger, HeaderModal } from '@components/Header';
import Link from 'next/link';
import LogoIcon from '@components/icons/LogoIcon';
import { Navigation } from '@components/Navigation';
import { routes } from '@config/routes';
import { useRootStore } from '@/store/RootStore/hooks';
import { Avatar } from '@components/Avatar';
import { useClient } from '@hooks/useClient';

export const Header = () => {
  const { profile } = useRootStore();

  const [open, setOpen] = useState(false);
  const { isClient } = useClient();

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
          <Link href={routes.profile.mask} className={styles.controls}>
            {isClient && <Avatar src={profile.avatarUrl} alt={'avatar'} size={30} />}
            <Text>{isClient ? profile.name : ''}</Text>
          </Link>
        </div>
      </Container>
    </header>
  );
};
