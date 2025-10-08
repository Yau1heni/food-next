import type { Direction } from './directions.ts';
import type { Equipments } from './equipments.ts';
import type { Ingredient } from './ingradients.ts';
import { StrapiBase, StrapiImage } from '@api/types';
import { CategoryApi } from '@/store/models';

export type Recipe = StrapiBase & {
  name: string;
  totalTime: number;
  cookingTime: number;
  preparationTime: number;
  servings: number;
  likes: number;
  calories: number;
  rating: number;
  summary: string;
  vegetarian: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  // при добавлении соответствующих query params
  images: StrapiImage[];
  ingradients: Ingredient[];
  category: CategoryApi[];
  equipments: Equipments[];
  directions: Direction[];
};

export type GetRecipesArgs = {
  page: number;
  categories: string;
  term?: string;
  isVegetarian?: boolean;
  rating?: { key: string; value: string }[];
};
