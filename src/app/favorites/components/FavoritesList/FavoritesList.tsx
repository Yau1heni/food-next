'use client';

import { useRootStore } from '@/store/RootStore/hooks';
import { observer } from 'mobx-react-lite';
import { FavoritesItem } from '../FavoritesItem/FavoritesItem';
import { useCallback } from 'react';
import Text from '@components/Text';
import { InfiniteScrollList } from '@components/InfiniteList';

export const FavoritesList = observer(() => {
  const { favorites } = useRootStore();

  const onRemove = useCallback(
    (id: number) => {
      favorites.removeFavorite(id);
    },
    [favorites]
  );

  if (!favorites) return null;

  if (favorites.list.length === 0) {
    return <Text>Нет избранных рецептов</Text>;
  }

  return (
    <InfiniteScrollList items={favorites.list} limit={5}>
      {(el) => (
        <FavoritesItem key={el.id} id={el.originalRecipeId} item={el.recipe} onRemove={onRemove} />
      )}
    </InfiniteScrollList>
  );
});
