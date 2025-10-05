import Text from '@components/Text';
import type { FC, PropsWithChildren } from 'react';

import styles from './List.module.scss';

type ListProps = {
  title: string;
} & PropsWithChildren;

export const List: FC<ListProps> = ({ children, title }) => {
  return (
    <div className={styles.list}>
      <Text view={'p-20'} weight={'bold'}>
        {title}
      </Text>
      <ul>{children}</ul>
    </div>
  );
};
