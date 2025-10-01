'use client';

import Button from '@components/Button';
import Text from '@components/Text';
import type { FC, ReactNode, MouseEvent } from 'react';
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
  const { calories, action, isFavorite = false, id } = props;

  const favorites = useRootStore().favorites;
  const isLoading = favorites.loadingById[id];

  const handleRemove = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    favorites.removeFavorite(id);
  };

  const handleAdd = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    favorites.addFavorite(id);
  };

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
