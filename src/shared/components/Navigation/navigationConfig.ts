import { routes } from '@config/routes';

export const navigationConfig = [
  { title: 'Recipes', to: routes.main.mask },
  { title: 'Favorites', to: routes.favorites.mask },
  { title: 'Profile', to: routes.profile.mask },
];
