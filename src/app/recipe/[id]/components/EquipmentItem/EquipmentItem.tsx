import { FC } from 'react';
import Text from '@components/Text';
import LadleIcon from '@components/icons/LadleIcon';

import styles from './EquipmentItem.module.scss';

type EquipmentItemProps = {
  name: string;
};

export const EquipmentItem: FC<EquipmentItemProps> = ({ name }) => {
  return (
    <div className={styles.equipmentItem}>
      <LadleIcon />
      <Text>{name}</Text>
    </div>
  );
};
