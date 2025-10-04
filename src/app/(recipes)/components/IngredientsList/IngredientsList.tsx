'use client';

import Card from '@components/Card';
import Text from '@components/Text';
import styles from './IngredientsList.module.scss';
import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import { routes } from '@config/routes';
import { IngredientsCardAction } from './IngredientsCardAction';
import { IngredientsCardCaption } from './IngredientsCardCaption';
import { useRootStore } from '@/store/RootStore/hooks';
import Loader from '@/shared/components/Loader';
import { Meta } from '@utils/meta';
import { useRecipesPageStore } from '@/store/RecipesStore';
import { getIngredients } from '@/app/(recipes)/components/IngredientsList/getIngredients';

export const IngredientsList = observer(() => {
  const { recipe: recipes } = useRecipesPageStore();
  const rootStore = useRootStore();

  if (!recipes) return null;

  if (recipes.meta === Meta.loading) {
    return (
      <div className={styles.loaderContainer}>
        <Loader />
      </div>
    );
  }

  if (recipes.list.length === 0) {
    return <Text>The list of ingredients is empty</Text>;
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
                isLoading={rootStore.favorites.loadingById[el.id]}
              />
            }
          />
        </Link>
      ))}
    </ul>
  );
});
