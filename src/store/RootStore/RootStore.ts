import FavoritesStore, { FavoritesPageStoreInitData } from '@/store/RootStore/FavoritesStore';
import { makeAutoObservable } from 'mobx';
import QueryParamsStore, { QueryParamsStoreInitData } from '@/store/RootStore/QueryParamsStore';
import ProfileStore from '@/store/RootStore/ProfileStore';

export type RootStoreInitData = {
  query?: QueryParamsStoreInitData;
  favorites?: FavoritesPageStoreInitData;
};

export default class RootStore {
  readonly query: QueryParamsStore;
  readonly favorites: FavoritesStore;
  readonly profile: ProfileStore;

  constructor(initData?: RootStoreInitData) {
    this.query = new QueryParamsStore(this, initData?.query);
    this.favorites = new FavoritesStore(this, initData?.favorites);
    this.profile = new ProfileStore();

    makeAutoObservable(this);
  }
}
