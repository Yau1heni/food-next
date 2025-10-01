import { FC } from 'react';
import { InfoItem } from '../InfoItem';

import styles from './RecipeStats.module.scss';

type RecipeStatsProps = {
  stats: {
    label: string;
    value: string | number;
  }[];
};

export const RecipeStats: FC<RecipeStatsProps> = ({ stats }) => {
  return (
    <div className={styles.recipeStats}>
      {stats.map(({ label, value }, index) => (
        <InfoItem key={index} label={label} value={value} />
      ))}
    </div>
  );
};
