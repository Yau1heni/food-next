import Text from '@components/Text';
import React from 'react';

import { DirectionStep } from '../DirectionStep';

import styles from './DirectionsSection.module.scss';
import { Direction } from '@/store/models';

type DirectionsSectionProps = {
  directions?: Direction[];
};

export const DirectionsSection: React.FC<DirectionsSectionProps> = ({ directions }) => {
  if (!directions) return null;

  return (
    <section className={styles.directionsSection}>
      <Text className={styles.title} view={'p-20'} weight={'bold'}>
        Directions
      </Text>
      <ul>
        {directions.map(({ id, description }, index) => (
          <DirectionStep key={id} description={description} step={index + 1} />
        ))}
      </ul>
    </section>
  );
};
