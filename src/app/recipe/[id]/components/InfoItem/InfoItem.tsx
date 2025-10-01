import Text from '@components/Text';
import { FC } from 'react';

import styles from './InfoItem.module.scss';

type InfoItemProps = {
  label: string;
  value: string | number;
};

export const InfoItem: FC<InfoItemProps> = ({ label, value }) => {
  return (
    <li className={styles.infoItem}>
      <Text maxLines={1}>{label}</Text>
      <Text maxLines={1} color={'accent'}>
        {value}
      </Text>
    </li>
  );
};
