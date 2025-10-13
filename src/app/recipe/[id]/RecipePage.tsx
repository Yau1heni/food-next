'use client';

import { RecipeImage } from '@/app/recipe/[id]/components/RecipeImage';
import { RecipeStats } from '@/app/recipe/[id]/components/RecipeStats';
import { getStatsData } from './components/getStatsData';
import { RecipeDescription } from '@/app/recipe/[id]/components/RecipeDescription';
import { IngredientsSection } from '@/app/recipe/[id]/components/IngredientsSection';
import { DirectionsSection } from '@/app/recipe/[id]/components/DirectionsSection';
import { PageTitle } from '@components/PageTitle';
import { Container } from '@components/Container';
import { useRecipeStore } from '@/store/RecipeStore';
import { observer } from 'mobx-react-lite';
import Button from '@components/Button';
import styles from './RecipePage.module.scss';
import { useRootStore } from '@/store/RootStore/hooks';
import { useCallback } from 'react';

export const RecipePage = observer(() => {
  const { currentRecipe: recipe } = useRecipeStore();
  const { favorites: favoritesStore } = useRootStore();

  if (recipe === null) return null;

  const addToFavorite = useCallback(() => {
    favoritesStore.addFavorite(recipe.id);
  }, [favoritesStore, recipe.id]);

  const removeFromFavorites = useCallback(() => {
    favoritesStore.removeFavorite(recipe.id);
  }, [favoritesStore, recipe.id]);

  const isFavorite = favoritesStore.checkAvailability(recipe.id);
  const isLoading = favoritesStore.loadingById[recipe.id];

  return (
    <div className={styles.recipe}>
      <div className={styles.backgroundImage} />
      <Container className={styles.recipeContainer}>
        <PageTitle title={recipe.name} />
        <div className={styles.stats}>
          <RecipeImage src={recipe.images[0]?.url || ''} alt={recipe.name} />
          <RecipeStats stats={getStatsData(recipe)} />
        </div>
        <RecipeDescription description={recipe.summary || 'No description available'} />
        <IngredientsSection ingredients={recipe.ingradients} equipments={recipe.equipments} />
        <DirectionsSection directions={recipe.directions} />
        <div className={styles.button}>
          <Button loading={isLoading} onClick={isFavorite ? removeFromFavorites : addToFavorite}>
            {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          </Button>
        </div>
      </Container>
    </div>
  );
});
