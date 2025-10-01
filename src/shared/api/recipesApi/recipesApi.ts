import qs from 'qs';
import { GetRecipesArgs, Recipe } from '@/store/models';
import { apiFetch } from '@utils/apiFetch';
import { ApiResponse } from '@api/types';

type Filters = {
  name?: Record<string, string>;
  vegetarian?: Record<string, boolean>;
  category?: {
    id: Record<string, string[]>;
  };
};

export const recipesApi = {
  async getRecipes(data: GetRecipesArgs): Promise<ApiResponse<Recipe[]>> {
    const { page, term, categories, isVegetarian } = data;

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

    return await apiFetch(`/recipes?${queryString}`);
  },

  async getRecipe(id: string): Promise<Recipe> {
    const queryString = qs.stringify(
      { populate: ['ingradients', 'images', 'category', 'equipments', 'directions'] },
      { encodeValuesOnly: true }
    );

    const res = await apiFetch(`/recipes/${id}?${queryString}`);
    return res.data;
  },
};
