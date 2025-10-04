import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { CollectionModel, Favorites, Nullable, REQUESTS_LIMIT, Statuses } from '@/store/models';
import { Meta } from '@utils/meta';
import RootStore from '@/store/RootStore';
import { favoritesApi } from '@api/favoritesApi';

export type FavoritesPageStoreInitData = {
  data: Favorites[];
  meta: Meta;
};

type PrivateFields = '_list' | '_loadingById' | '_errorMessage' | '_meta';

export default class FavoritesStore {
  private _rootStore: RootStore;

  private _list = new CollectionModel<number, Favorites>();

  private _statuses: Map<number, Statuses> = new Map();
  private _activeRequests: number = 0;

  private _meta: Meta = Meta.initial;
  private _loadingById: Record<number, boolean> = {};
  private _errorMessage: Nullable<string> = null;

  constructor(rootStore: RootStore, init?: FavoritesPageStoreInitData) {
    this._rootStore = rootStore;

    if (init) {
      this._list.normalize(init.data, (listItem) => listItem.originalRecipeId);
      this._meta = init.meta;
    }

    makeObservable<FavoritesStore, PrivateFields>(this, {
      _list: observable.ref,
      _loadingById: observable,
      _meta: observable,
      _errorMessage: observable,

      list: computed,
      loadingById: computed,
      meta: computed,
      isLimitReached: computed,

      /*fetchFavoritesData: action,*/
      removeFavorite: action,
      addFavorite: action,
      setLoading: action,
    });
  }

  get list(): Favorites[] {
    return this._list.linearize;
  }

  get loadingById() {
    return this._loadingById;
  }

  get meta() {
    return this._meta;
  }

  setLoading(id: number, value: boolean) {
    this.loadingById[id] = value;
  }

  get isLimitReached() {
    return this._activeRequests >= REQUESTS_LIMIT;
  }

  getStatus(productId: number) {
    return this._statuses.get(productId) ?? Statuses.idle;
  }

  get errorMessage(): Nullable<string> {
    return this._errorMessage;
  }

  static async fetchFavoritesData(): Promise<FavoritesPageStoreInitData> {
    const res = await favoritesApi.getFavorites();

    return { data: res, meta: Meta.success };
  }

  async removeFavorite(id: number) {
    // Если лимит достигнут — блокируем
    if (this.isLimitReached) {
      this._statuses.set(id, Statuses.blocked);
      alert(Statuses.blocked); // думаю добавить Toaster, в котором выведу сообщение (не успел оформить)
      return;
    }

    // Если товар уже в процессе — игнорируем
    if (this.getStatus(id) === Statuses.loading) return;
    this._statuses.set(id, Statuses.loading);
    this._activeRequests++;

    this.setLoading(id, true);

    const res = await favoritesApi.removeFavorite({ recipe: id });

    if (res.ok) {
      runInAction(() => {
        this._list.remove(id);
        this._meta = Meta.success;
        this.setLoading(id, false);
        this._activeRequests--;
        this._statuses.set(id, Statuses.added);
      });
    } else {
      runInAction(() => {
        this._meta = Meta.error;
        this._list.reset();
        this.setLoading(id, false);
        this._statuses.set(id, Statuses.error);
        this._activeRequests--;
      });
    }
  }

  async addFavorite(id: number) {
    // Если лимит достигнут — блокируем
    if (this.isLimitReached) {
      this._statuses.set(id, Statuses.blocked);
      alert(Statuses.blocked); // думаю добавить Toaster, в котором выведу сообщение (не успел оформить)
      return;
    }

    // Если товар уже в процессе — игнорируем
    if (this.getStatus(id) === Statuses.loading) return;
    this._statuses.set(id, Statuses.loading);
    this._activeRequests++;

    this.setLoading(id, true);

    const res = await favoritesApi.addFavorite({ recipe: id });

    try {
      runInAction(() => {
        this._list.add(res, (listItem) => listItem.originalRecipeId);
        this._meta = Meta.success;
        this.setLoading(id, false);

        this._statuses.set(id, Statuses.added);
      });
    } catch (err) {
      runInAction(() => {
        this._errorMessage = err instanceof Error ? err.message : String(err);
        this._meta = Meta.error;
        this._list.reset();
        this.setLoading(id, false);
        this._statuses.set(id, Statuses.error);
      });
    } finally {
      runInAction(() => {
        this._activeRequests--;
        this.setLoading(id, false);
      });
    }
  }

  checkAvailability(id: number) {
    if (this.meta === Meta.success) {
      return this._list.has(id);
    }
  }
}
