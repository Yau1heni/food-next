import Text from '@components/Text';
import DishTrayIcon from '@components/icons/DishTrayIcon';
import { FC } from 'react';

import styles from './IngredientItem.module.scss';

type IngredientItemProps = {
  name: string;
  amount: number;
  unit: string;
};

export const IngredientItem: FC<IngredientItemProps> = ({ name, amount, unit }) => {
  return (
    <div className={styles.ingredientItem}>
      <DishTrayIcon />
      <Text>
        {amount} {unit} {name}
      </Text>
    </div>
  );
};
