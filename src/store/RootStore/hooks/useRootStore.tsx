'use client';

import RootStore from '@/store/RootStore';
import React from 'react';
import { RootStoreInitData } from '@/store/RootStore';
import { Nullable } from '@/store/models';
import { useCreateRootStore } from '@/store/RootStore/hooks';
import { useStrictContext } from '@/store/RootStore/hooks';

type RootStoreContextValue = RootStore;

type RootStoreProviderProps = {
  children: React.ReactNode;
  initData: RootStoreInitData;
};

const RootStoreContext = React.createContext<Nullable<RootStoreContextValue>>(null);

export const RootStoreProvider: React.FC<RootStoreProviderProps> = ({ children, initData }) => {
  const store = useCreateRootStore(initData);

  return <RootStoreContext.Provider value={store}>{children}</RootStoreContext.Provider>;
};

export const useRootStore = () => {
  return useStrictContext({
    context: RootStoreContext,
    message: 'RootStoreContext was not provided',
  });
};
