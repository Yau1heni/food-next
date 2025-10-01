import { action, computed, makeObservable, observable } from 'mobx';

type PrivateFields = '_order' | '_entities';

export class CollectionModel<K extends string | number, T> {
  private _order: K[] = [];
  private _entities: Record<K, T> = {} as Record<K, T>;

  constructor(elements?: T[], getKeyForElement?: (element: T) => K) {
    makeObservable<this, PrivateFields>(this, {
      _order: observable.shallow,
      _entities: observable.shallow,

      linearize: computed,

      reset: action,
      normalize: action,
      add: action,
      remove: action,
    });

    if (elements && getKeyForElement) {
      this.normalize(elements, getKeyForElement);
    }
  }

  reset(): void {
    this._order = [];
    this._entities = {} as Record<K, T>;
  }

  normalize(elements: T[], getKeyForElement: (element: T) => K): void {
    this.reset();
    elements.forEach((el) => {
      const id = getKeyForElement(el);
      this._order.push(id);
      this._entities[id] = el;
    });
  }

  add(element: T, getKeyForElement: (element: T) => K): void {
    const id = getKeyForElement(element);
    if (!this._entities[id]) {
      this._order.push(id);
    }
    this._entities[id] = element;
  }

  remove(id: K): void {
    if (this._entities[id]) {
      delete this._entities[id];
      this._order = this._order.filter((key) => key !== id);
    }
  }

  get linearize(): T[] {
    return this._order.map((id) => this._entities[id]);
  }

  has(id: K): boolean {
    return !!this._entities[id];
  }
}
