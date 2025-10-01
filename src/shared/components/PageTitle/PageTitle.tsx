import Text from '@components/Text';
import styles from './PageTitle.module.scss';
import ArrowRightIcon from '@components/icons/ArrowRightIcon';
import { routes } from '@config/routes';
import Link from 'next/link';
import { FC } from 'react';

type RecipeTitleProps = {
  title: string;
  to?: string;
};

export const PageTitle: FC<RecipeTitleProps> = ({ title, to = routes.main.mask }) => {
  return (
    <div className={styles.pageTitle}>
      <Link href={to} className={styles.goBack} aria-label={'link go back'}>
        <ArrowRightIcon width={32} height={32} viewBox="0 0 32 32" color={'accent'} />
      </Link>
      <Text maxLines={2} weight={'bold'} className={styles.title}>
        {title}
      </Text>
    </div>
  );
};
