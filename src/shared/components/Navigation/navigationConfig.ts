import { routes } from '@config/routes';

export const navigationConfig = [
  { title: 'Recipes', to: routes.main.mask },
  { title: 'Favorites', to: routes.favorites.mask },
  { title: 'Products', to: '#' },
  { title: 'Menu Items', to: '#' },
  { title: 'Meal Planning', to: '#' },
];
