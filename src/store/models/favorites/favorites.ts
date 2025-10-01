import { Nullable, Recipe } from '@/store/models';
import { StrapiBase } from '@api/types';

export type Favorites = StrapiBase & {
  createdAt: string;
  updatedAt: string;
  publishedAt: Nullable<string>;
  locale: null;
  originalRecipeId: number;
  recipe: Recipe;
};

export const Statuses = {
  idle: 'idle',
  blocked: 'blocked',
  loading: 'loading',
  added: 'added',
  error: 'error',
} as const;

export type Statuses = (typeof Statuses)[keyof typeof Statuses];
