'use client';

import Text from '@components/Text';
import AlarmClockIcon from '@components/icons/AlarmClockIcon';
import type { FC } from 'react';

import styles from './IngredientsCardCaption.module.scss';

type IngredientsCardCaptionProps = {
  cookingTime: number;
  isFavorite?: boolean;
};

export const IngredientsCardCaption: FC<IngredientsCardCaptionProps> = ({
  cookingTime,
  isFavorite = false,
}) => {
  return (
    <div className={styles.captionSlot}>
      <div className={styles.cookingTime}>
        <AlarmClockIcon />
        {`${cookingTime} minutes`}
      </div>
      {isFavorite && <Text>favorite</Text>}
    </div>
  );
};

export default IngredientsCardCaption;
