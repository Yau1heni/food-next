'use client';

import { createContext, FC, PropsWithChildren } from 'react';
import { useLocalObservable } from 'mobx-react-lite';
import RecipeStore, { RecipePageStoreInitData } from '@/store/RecipeStore';
import { useStrictContext } from '@/store/RootStore/hooks';
import { Nullable } from '@/store/models';

type RecipePageStoreContextProviderValue = PropsWithChildren<{
  initData: RecipePageStoreInitData;
}>;

const RecipePageStoreContext = createContext<Nullable<RecipeStore>>(null);

export const RecipePageStoreContextProvider: FC<RecipePageStoreContextProviderValue> = ({
  children,
  initData,
}) => {
  const store = useLocalObservable(() => RecipeStore.fromJson(initData));

  return (
    <RecipePageStoreContext.Provider value={store}>{children}</RecipePageStoreContext.Provider>
  );
};

export const useRecipeStore = () => {
  return useStrictContext({
    context: RecipePageStoreContext,
    message: 'RecipePageStoreContext was not provided',
  });
};
