import { CategoryApi, CategoryModel, normalizeCategory } from '@/store/models';
import { action, computed, makeObservable, observable } from 'mobx';
import { categoriesApi } from '@api/categoriesApi';

export type CategoriesPageStoreInitData = {
  data: CategoryApi[];
};

type PrivateFields = '_list';

export default class CategoriesStore {
  private _list: CategoryModel[] = [];

  constructor(init?: CategoriesPageStoreInitData) {
    if (init) {
      for (const item of init.data) {
        this._list.push(normalizeCategory(item));
      }
    }

    makeObservable<CategoriesStore, PrivateFields>(this, {
      _list: observable.ref,

      list: computed,

      reset: action,
      destroy: action,
    });
  }

  get list(): CategoryModel[] {
    return this._list;
  }

  reset(): void {
    this._list = [];
  }

  destroy(): void {
    this.reset();
  }

  static async getCategories() {
    const response = await categoriesApi.getCategories();

    return { data: response };
  }

  static fromJson(data: CategoriesPageStoreInitData) {
    return new CategoriesStore(data);
  }
}
