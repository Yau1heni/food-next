import {
  action,
  comparer,
  computed,
  makeObservable,
  observable,
  reaction,
  runInAction,
} from 'mobx';
import {
  CollectionModel,
  getCategoryKeys,
  getInitialPaginationModel,
  GetRecipesArgs,
  Nullable,
  PaginationModel,
  Recipe,
} from '@/store/models';
import { Meta } from '@utils/meta';
import RootStore from '@/store/RootStore';
import { recipesApi } from '@api/recipesApi';
import { MetaApi } from '@api/types';
import { Option } from '@components/MultiDropdown';

export type RecipesPageStoreInitData = {
  data: Recipe[];
  meta: MetaApi;
};

type PrivateFields =
  | '_list'
  | '_meta'
  | '_errorMessage'
  | '_pagination'
  | '_reactionDisposer'
  | '_rootStore';

export default class RecipesStore {
  private _rootStore: RootStore;

  private _list = new CollectionModel<number, Recipe>();
  private _pagination: PaginationModel = getInitialPaginationModel();
  private _meta: Meta = Meta.initial;
  private _errorMessage: Nullable<string> = null;
  private _reactionDisposer: Nullable<() => void> = null;

  constructor(rootStore: RootStore, init?: RecipesPageStoreInitData) {
    this._rootStore = rootStore;

    if (init) {
      this._list.normalize(init.data, (listItem) => listItem.id);
      this._pagination = init.meta.pagination;
    }

    if (typeof window !== 'undefined') {
      this.favoriteDisposer();
    }

    makeObservable<RecipesStore, PrivateFields>(this, {
      _rootStore: observable,
      _list: observable.ref,
      _pagination: observable,
      _meta: observable,
      _errorMessage: observable,
      _reactionDisposer: observable,

      list: computed,
      meta: computed,
      pagination: computed,

      reset: action,
      destroy: action,
      load: action.bound,
      setPage: action.bound,
    });
  }

  get list(): Recipe[] {
    return this._list.linearize;
  }

  get pagination(): PaginationModel {
    return this._pagination;
  }

  get meta(): Meta {
    return this._meta;
  }

  get errorMessage(): Nullable<string> {
    return this._errorMessage;
  }

  setPage(page: number): void {
    this._rootStore.query.page = page;
  }

  static async getInitData(payload: GetRecipesArgs): Promise<RecipesPageStoreInitData> {
    return await recipesApi.getRecipes(payload);
  }

  async load(payload: GetRecipesArgs) {
    this._meta = Meta.loading;
    this._list.reset();
    this._errorMessage = null;

    const response = await recipesApi.getRecipes(payload);

    try {
      runInAction(() => {
        this._list.normalize(response.data, (listItem) => listItem.id);
        this._meta = Meta.success;
        this._pagination = response.meta.pagination;
      });
    } catch (err) {
      this._errorMessage = err instanceof Error ? err.message : String(err);
      this._meta = Meta.error;
      this._list.reset();
    }
  }

  static fromJson(rootStore: RootStore, data: RecipesPageStoreInitData) {
    return new RecipesStore(rootStore, data);
  }

  private favoriteDisposer() {
    this._reactionDisposer = reaction(
      () => [
        this._rootStore.query.searchTerm,
        this._rootStore.query.page,
        this._rootStore.query.vegetarian,
        this._rootStore.query.category,
      ],
      ([term, page, isVegetarian, categories]) => {
        this.load({
          term,
          page,
          isVegetarian,
          categories: getCategoryKeys(categories as Option[]),
        } as GetRecipesArgs);
      },
      {
        equals: comparer.structural,
        delay: 100,
      }
    );
  }

  dispose() {
    if (this._reactionDisposer) {
      this._reactionDisposer();
      this._reactionDisposer = null;
    }
  }

  reset(): void {
    this._list.reset();
    this._pagination = getInitialPaginationModel();
    this._meta = Meta.initial;
    this.dispose();
  }

  destroy(): void {
    this.reset();
  }
}
