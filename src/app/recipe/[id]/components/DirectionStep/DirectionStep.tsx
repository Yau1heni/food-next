import Text from '@components/Text';
import React from 'react';

import styles from './DirectionStep.module.scss';

type DirectionStepProps = {
  description: string;
  step: number;
};

export const DirectionStep: React.FC<DirectionStepProps> = ({ description, step }) => {
  return (
    <li className={styles.directionStep}>
      <Text className={styles.stepNumber} weight={'bold'}>
        Step {step}
      </Text>
      <Text view={'p-14'}>{description}</Text>
    </li>
  );
};
