import qs from 'qs';
import { GetRecipesArgs, Recipe } from '@/store/models';
import { apiFetch, CACHE_LIFETIME_IN_SECONDS } from '@utils/apiFetch';
import { ApiResponse } from '@api/types';
import { ApiUrls } from '@config/apiUrls';

type Filters = {
  name?: Record<string, string>;
  vegetarian?: Record<string, boolean>;
  category?: {
    id: Record<string, string[]>;
  };
  rating?: Record<string, string[]>;
};

export const recipesApi = {
  async getRecipes(data: GetRecipesArgs): Promise<ApiResponse<Recipe[]>> {
    const { page, term, categories, isVegetarian, rating } = data;

    const filters: Filters = {};

    if (term) {
      filters.name = {
        $containsi: term,
      };
    }

    if (categories) {
      filters.category = {
        id: {
          $in: categories.split(','),
        },
      };
    }

    console.log(rating, 'rating');
    console.log(categories, 'category');

    if (rating) {
      filters.rating = {
        $in: rating.map((el) => el.value),
      };
    }

    if (isVegetarian) {
      filters.vegetarian = {
        $eq: isVegetarian,
      };
    }

    const queryString = qs.stringify(
      {
        populate: ['ingradients', 'images', 'category'],
        pagination: { pageSize: 9, page: page },
        filters: filters,
      },
      { encodeValuesOnly: true }
    );

    return await apiFetch(ApiUrls.recipes.getRecipesUrl(queryString), {
      next: { revalidate: CACHE_LIFETIME_IN_SECONDS },
    });
  },

  async getRecipe(id: string): Promise<Recipe> {
    const queryString = qs.stringify(
      { populate: ['ingradients', 'images', 'category', 'equipments', 'directions'] },
      { encodeValuesOnly: true }
    );

    const res = await apiFetch(ApiUrls.recipes.getRecipeUrl(queryString, id), {
      next: { revalidate: CACHE_LIFETIME_IN_SECONDS },
    });
    return res.data;
  },
};
