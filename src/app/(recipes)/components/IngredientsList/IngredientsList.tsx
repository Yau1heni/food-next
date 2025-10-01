'use client';

import Card from '@components/Card';
import Text from '@components/Text';
import styles from './IngredientsList.module.scss';
import { Ingredient } from '@/store/models';
import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import { routes } from '@config/routes';
import IngredientsCardAction from './IngredientsCardAction';
import IngredientsCardCaption from './IngredientsCardCaption';
import { useRootStore } from '@/store/RootStore/hooks';
import Loader from '@/shared/components/Loader';
import { Meta } from '@utils/meta';
import { useCallback } from 'react';
import { useRecipesPageStore } from '@/store/RecipesStore';

export const IngredientsList = observer(() => {
  const recipes = useRecipesPageStore().recipe;
  const rootStore = useRootStore();

  const getIngredients = useCallback(
    (ingredients: Ingredient[]) => ingredients.map(({ name }) => name).join(' + '),
    []
  );

  if (!recipes) return null;

  if (recipes.meta === Meta.loading) {
    return (
      <div className={styles.loaderContainer}>
        <Loader />
      </div>
    );
  }

  if (recipes.list.length === 0) {
    return <Text>Список ингридиентов пуст</Text>;
  }

  return (
    <ul className={styles.ingredientsList}>
      {recipes.list.map((el) => (
        <Link key={el.id} href={routes.recipe.create(el.documentId)} className={styles.cardLink}>
          <Card
            captionSlot={
              <IngredientsCardCaption
                cookingTime={el.cookingTime}
                isFavorite={rootStore.favorites.checkAvailability(el.id)}
              />
            }
            title={el.name}
            subtitle={getIngredients(el.ingradients)}
            image={el.images[0].url}
            actionSlot={
              <IngredientsCardAction
                id={el.id}
                calories={el.calories}
                isFavorite={rootStore.favorites.checkAvailability(el.id)}
              />
            }
          />
        </Link>
      ))}
    </ul>
  );
});
