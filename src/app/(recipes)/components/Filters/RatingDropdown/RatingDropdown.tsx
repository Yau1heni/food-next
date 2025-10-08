import { useCallback } from 'react';
import MultiDropdown, { Option } from '@components/MultiDropdown';
import styles from './RatingDropdown.module.scss';
import { getRatingTitle } from '@utils/getTitle';
import { useRootStore } from '@/store/RootStore/hooks';
import { optionRating } from './optionRating';

export const RatingDropdown = () => {
  const rootStore = useRootStore();

  const onChangeRating = useCallback(
    (value: Option[]) => {
      rootStore.query.rating = value;
    },
    [rootStore.query]
  );

  return (
    <MultiDropdown
      className={styles.ratingDropdown}
      options={optionRating}
      value={rootStore.query.rating}
      onChange={onChangeRating}
      getTitle={getRatingTitle}
    />
  );
};
