'use client';

import Text from '@components/Text';
import styles from './PageTitle.module.scss';
import ArrowRightIcon from '@components/icons/ArrowRightIcon';
import { FC } from 'react';
import Button from '@components/Button';
import { useRouter } from 'next/navigation';

type RecipeTitleProps = {
  title: string;
};

export const PageTitle: FC<RecipeTitleProps> = ({ title }) => {
  const router = useRouter();

  return (
    <div className={styles.pageTitle}>
      <Button className={styles.goBack} onClick={() => router.back()}>
        <ArrowRightIcon width={32} height={32} viewBox="0 0 32 32" color={'accent'} />
      </Button>
      <Text maxLines={2} weight={'bold'} className={styles.title}>
        {title}
      </Text>
    </div>
  );
};
