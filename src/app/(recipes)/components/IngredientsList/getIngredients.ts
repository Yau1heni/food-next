import { Ingredient } from '@/store/models';

export const getIngredients = (ingredients: Ingredient[]) =>
  ingredients.map(({ name }) => name).join(' + ');
