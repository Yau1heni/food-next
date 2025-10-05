'use client';

import { Container } from '@components/Container';
import styles from './RecipesPage.module.scss';
import { Description } from './components/Description';
import { Filters } from './components/Filters';
import { IngredientsList } from './components/IngredientsList';
import Pagination from '@components/Pagination';
import { PAGINATION_LIMIT } from '@/store/models';
import { Meta } from '@utils/meta';
import { observer } from 'mobx-react-lite';
import { useRecipesPageStore } from '@/store/RecipesStore';

export const RecipesPage = observer(() => {
  const { recipe: recipesStore } = useRecipesPageStore();

  return (
    <Container>
      <section className={styles.content}>
        <Description />
        <Filters />
        <IngredientsList />
        {recipesStore.meta !== Meta.error && recipesStore.pagination.total > PAGINATION_LIMIT && (
          <Pagination
            page={recipesStore.pagination.page}
            onChange={recipesStore.setPage}
            total={recipesStore.pagination.total}
          />
        )}
      </section>
    </Container>
  );
});
