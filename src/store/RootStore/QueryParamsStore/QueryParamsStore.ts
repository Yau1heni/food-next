import { action, computed, makeObservable, observable } from 'mobx';
import qs from 'qs';
import type { ParsedQs } from 'qs';
import { CategoryModel, QueryParams, START_PAGE } from '@/store/models';
import RootStore from '@/store/RootStore';

export type QueryParamsStoreInitData = {
  data: qs.ParsedQs;
};

type PrivateFields = '_params' | '_search';

export default class QueryParamsStore {
  private rootStore: RootStore;

  private _params: qs.ParsedQs = {};
  private _search = '';

  constructor(rootStore: RootStore, init?: QueryParamsStoreInitData) {
    this.rootStore = rootStore;

    if (init) {
      this._params = init;
    }

    makeObservable<QueryParamsStore, PrivateFields>(this, {
      _params: observable.ref,
      _search: observable.ref,

      setSearch: action,
      setParam: action,
      reset: action.bound,

      page: computed,
      searchTerm: computed,
      category: computed,
      searchString: computed,
      vegetarian: computed,
      rating: computed,
    });
  }

  setParam(key: string, value?: string | number | null) {
    if (value === undefined || value === null || value === '') {
      Reflect.deleteProperty(this._params, key);
    } else {
      this._params = { ...this._params, [key]: String(value) };
    }
    this._search = qs.stringify(this._params, { addQueryPrefix: true });
  }

  get searchString() {
    return this._search;
  }

  getParam(key: string): string | ParsedQs | (string | ParsedQs)[] | undefined {
    return this._params[key];
  }

  setSearch(search: string) {
    search = search.startsWith('?') ? search.slice(1) : search;

    if (this._search !== search) {
      this._search = search;
      this._params = qs.parse(search);
    }
  }

  get page(): number {
    const value = this._params.page;
    return value ? Number(value) : START_PAGE;
  }

  set page(p: number) {
    this.setParam(QueryParams.page, p);
  }

  get searchTerm(): string {
    return (this._params.searchTerm as string) || '';
  }

  set searchTerm(term: string) {
    this.page = START_PAGE;
    this.setParam(QueryParams.searchString, term);
  }

  get category(): CategoryModel[] {
    const categoryParam = this.getParam(QueryParams.category);
    if (!categoryParam) return [];

    try {
      return JSON.parse(categoryParam as string);
    } catch {
      return [];
    }
  }

  set category(value: CategoryModel[]) {
    this.setParam(QueryParams.category, JSON.stringify(value));
    this.page = START_PAGE;
  }

  get vegetarian(): boolean {
    return this._params.isVegetarian === 'true';
  }

  set vegetarian(isVegetarian: boolean) {
    this.page = START_PAGE;
    this.setParam(QueryParams.vegetarian, String(isVegetarian));
  }

  get rating(): [] {
    const ratingParam = this.getParam(QueryParams.rating);
    if (!ratingParam) return [];

    try {
      return JSON.parse(ratingParam as string);
    } catch {
      return [];
    }
  }

  set rating(rating: { key: string; value: string }[]) {
    this.setParam(QueryParams.rating, JSON.stringify(rating));
    this.page = START_PAGE;
  }

  reset() {
    this._params = {};
    this._search = '';
  }
}
