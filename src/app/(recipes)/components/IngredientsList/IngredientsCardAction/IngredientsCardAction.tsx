'use client';

import Button from '@components/Button';
import Text from '@components/Text';
import { FC, ReactNode, MouseEvent, useCallback } from 'react';
import styles from './IngredientsCardAction.module.scss';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '@/store/RootStore/hooks';

type IngredientsCardActionProps = {
  id: number;
  calories: number;
  isFavorite?: boolean;
  action?: ReactNode;
  isLoading?: boolean;
};

export const IngredientsCardAction: FC<IngredientsCardActionProps> = (props) => {
  const { calories, action, isFavorite = false, id, isLoading } = props;

  const { favorites: favorites } = useRootStore();

  const handleRemove = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      favorites.removeFavorite(id);
    },
    [favorites, id]
  );

  const handleAdd = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      favorites.addFavorite(id);
    },
    [favorites, id]
  );

  return (
    <div className={styles.actionRow}>
      <Text weight={'bold'} view={'p-18'} color={'accent'}>{`${calories} kcal`}</Text>
      {action ?? (
        <Button loading={isLoading} onClick={isFavorite ? handleRemove : handleAdd}>
          {isFavorite ? 'Remove' : 'Save'}
        </Button>
      )}
    </div>
  );
};

export default observer(IngredientsCardAction);
