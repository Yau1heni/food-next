'use client';

import styles from './FavoritesList.module.scss';
import { useRootStore } from '@/store/RootStore/hooks';
import { observer } from 'mobx-react-lite';
import { FavoritesItem } from '../FavoritesItem/FavoritesItem';
import { useCallback } from 'react';
import Text from '@components/Text';
import { useClientPagination } from '@hooks/useClientPagination';
import { Meta } from '@utils/meta';
import { PAGINATION_LIMIT } from '@/store/models';
import Pagination from '@components/Pagination';

export const FavoritesList = observer(() => {
  const store = useRootStore();
  const favorites = store.favorites;

  const { paginatedData, total, setPage, page } = useClientPagination({
    data: favorites.list,
  });

  const onRemove = useCallback(
    (id: number) => {
      store.favorites.removeFavorite(id);
    },
    [store.favorites]
  );

  if (!favorites) return null;

  if (favorites.list.length === 0) {
    return <Text>Нет избранных рецептов</Text>;
  }

  return (
    <ul className={styles.favoritesList}>
      {paginatedData.map((el) => (
        <FavoritesItem
          key={el.id}
          id={el.originalRecipeId}
          item={el.recipe}
          onRemove={onRemove}
          isLoading={favorites.loadingById[el.originalRecipeId]}
        />
      ))}
      {favorites.meta !== Meta.error && favorites.list.length > PAGINATION_LIMIT && (
        <Pagination page={page} onChange={setPage} total={total} />
      )}
    </ul>
  );
});
