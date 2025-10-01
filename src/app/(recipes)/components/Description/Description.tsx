import Text from '@components/Text';

import styles from './Description.module.scss';

export const Description = () => {
  return (
    <div className={styles.description}>
      <Text view={'p-20'} maxLines={2}>
        Find the perfect food and&nbsp;
        <Text tag={'span'} className={styles.underlineText} view={'p-20'}>
          drink ideas
        </Text>
        &nbsp;for every occasion, from&nbsp;
        <Text tag={'span'} className={styles.underlineText} view={'p-20'}>
          weeknight dinners
        </Text>
        &nbsp;to&nbsp;
        <Text tag={'span'} className={styles.underlineText} view={'p-20'}>
          holiday feasts
        </Text>
        .
      </Text>
    </div>
  );
};
