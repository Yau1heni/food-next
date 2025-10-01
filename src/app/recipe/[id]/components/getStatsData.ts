import { Recipe } from '@/store/models';
import { plural } from '@utils/plural';

export const getStatsData = (data: Recipe) => {
  return [
    { label: 'Preparation', value: `${data.preparationTime} minutes` },
    { label: 'Cooking', value: `${data.cookingTime} minutes` },
    { label: 'Total', value: data.totalTime },
    { label: 'Likes', value: data.likes },
    {
      label: 'Servings',
      value: `${data.servings} ${plural(data.servings, {
        one: 'serving',
        other: 'servings',
      })}`,
    },
    { label: 'Ratings', value: `${data.rating} / 5` },
    { label: 'Vegetarian', value: `${data.vegetarian ? 'yes' : 'no...'}` },
    { label: 'Calories', value: `${data.calories} kcal` },
  ];
};
