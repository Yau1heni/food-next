import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { CollectionModel, Favorites, REQUESTS_LIMIT, Statuses } from '@/store/models';
import { Meta } from '@utils/meta';
import RootStore from '@/store/RootStore';
import { favoritesApi } from '@api/favoritesApi';
import { toast } from 'react-toastify';

export type FavoritesPageStoreInitData = {
  data: Favorites[];
  meta: Meta;
};

type PrivateFields = '_list' | '_loadingById' | '_meta';

export default class FavoritesStore {
  private _rootStore: RootStore;

  private _list = new CollectionModel<number, Favorites>();

  private _statuses: Map<number, Statuses> = new Map();
  private _activeRequests: number = 0;

  private _meta: Meta = Meta.initial;
  private _loadingById: Record<number, boolean> = {};

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

      list: computed,
      loadingById: computed,
      meta: computed,
      isLimitReached: computed,

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

  static async fetchFavoritesData(): Promise<FavoritesPageStoreInitData> {
    const res = await favoritesApi.getFavorites();

    return { data: res, meta: Meta.success };
  }

  async removeFavorite(id: number) {
    // Если лимит достигнут — блокируем
    if (this.isLimitReached) {
      this._statuses.set(id, Statuses.blocked);
      toast.warning('The request limit has been reached, please wait...');
      return;
    }

    // Если товар уже в процессе — игнорируем
    if (this.getStatus(id) === Statuses.loading) return;

    this._statuses.set(id, Statuses.loading);
    this._activeRequests++;
    this.setLoading(id, true);
    const prescriptionForRemoval = this.list.find((f) => id === f.originalRecipeId);

    try {
      const res = await favoritesApi.removeFavorite({ recipe: id });

      if (res.ok) {
        runInAction(() => {
          this._list.remove(id);
          this._meta = Meta.success;
          this._activeRequests--;
          this._statuses.set(id, Statuses.added);
          this.setLoading(id, false);
          toast.success(
            `${prescriptionForRemoval?.recipe.name} successfully removed from favorites`
          );
        });
      } else {
        runInAction(() => {
          this._meta = Meta.error;
          this._list.reset();
          this._statuses.set(id, Statuses.error);
          this._activeRequests--;
          this.setLoading(id, false);
          toast.error(
            `An error occurred while deleting ${prescriptionForRemoval?.recipe.name} from favorites`
          );
        });
      }
    } catch (err) {
      this._statuses.set(id, Statuses.error);
      this._activeRequests--;
      this.setLoading(id, false);
      toast.error(err instanceof Error ? err.message : String(err));
    }
  }

  async addFavorite(id: number) {
    // Если лимит достигнут — блокируем
    if (this.isLimitReached) {
      this._statuses.set(id, Statuses.blocked);
      toast.warning('The request limit has been reached, please wait...');
      return;
    }

    // Если товар уже в процессе — игнорируем
    if (this.getStatus(id) === Statuses.loading) return;

    this._statuses.set(id, Statuses.loading);
    this._activeRequests++;
    this.setLoading(id, true);

    try {
      const res = await favoritesApi.addFavorite({ recipe: id });

      runInAction(() => {
        this._list.add(res, (listItem) => listItem.originalRecipeId);
        this._meta = Meta.success;
        this.setLoading(id, false);
        this._statuses.set(id, Statuses.added);
        toast.success(`${res.recipe.name} successfully added to favorites`);
      });
    } catch (err) {
      runInAction(() => {
        this._meta = Meta.error;
        this._list.reset();
        this._statuses.set(id, Statuses.error);
        this.setLoading(id, false);
        toast.error(err instanceof Error ? err.message : String(err));
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
