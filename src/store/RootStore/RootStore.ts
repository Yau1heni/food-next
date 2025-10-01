import FavoritesStore, { FavoritesPageStoreInitData } from '@/store/RootStore/FavoritesStore';
import { makeAutoObservable } from 'mobx';
import QueryParamsStore, { QueryParamsStoreInitData } from '@/store/RootStore/QueryParamsStore';

export type RootStoreInitData = {
  query?: QueryParamsStoreInitData;
  favorites?: FavoritesPageStoreInitData;
};

export default class RootStore {
  readonly query: QueryParamsStore;
  readonly favorites: FavoritesStore;

  constructor(initData?: RootStoreInitData) {
    this.query = new QueryParamsStore(this, initData?.query);
    this.favorites = new FavoritesStore(this, initData?.favorites);

    makeAutoObservable(this);
  }

  static async initOnServer(): Promise<RootStore> {
    const store = new RootStore();

    await store.favorites.getInitData();

    return store;
  }

  serialize(): RootStoreInitData {
    return {
      favorites: this.favorites.serialize(),
    };
  }
}
