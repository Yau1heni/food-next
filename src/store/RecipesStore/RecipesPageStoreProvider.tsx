'use client';

import RecipesStore, { RecipesPageStoreInitData } from '@/store/RecipesStore';
import { useStrictContext } from '@/store/RootStore/hooks';
import { createContext, FC, PropsWithChildren } from 'react';
import { useLocalObservable } from 'mobx-react-lite';
import CategoriesStore, { CategoriesPageStoreInitData } from '@/store/CategoriesStore';
import { useRootStore } from '@/store/RootStore/hooks';
import { Nullable } from '@/store/models';

type RecipesPageStoreContextProviderValue = PropsWithChildren<{
  initData: {
    recipe: RecipesPageStoreInitData;
    category: CategoriesPageStoreInitData;
  };
}>;

type Context = {
  recipe: RecipesStore;
  category: CategoriesStore;
};

const RecipesPageStoreContext = createContext<Nullable<Context>>(null);

export const RecipesPageStoreContextProvider: FC<RecipesPageStoreContextProviderValue> = ({
  children,
  initData,
}) => {
  const rootStore = useRootStore();
  const recipesStore = useLocalObservable(() => RecipesStore.fromJson(rootStore, initData.recipe));
  const categoriesStore = useLocalObservable(() => CategoriesStore.fromJson(initData.category));

  return (
    <RecipesPageStoreContext.Provider value={{ recipe: recipesStore, category: categoriesStore }}>
      {children}
    </RecipesPageStoreContext.Provider>
  );
};

export const useRecipesPageStore = () => {
  return useStrictContext({
    context: RecipesPageStoreContext,
    message: 'RecipesPageStoreContext was not provided',
  });
};
