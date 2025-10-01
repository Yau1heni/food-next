import Button from '@components/Button';
import CheckBox from '@components/CheckBox';
import Input from '@components/Input';
import MultiDropdown, { type Option } from '@components/MultiDropdown';
import Text from '@components/Text';
import SearchIcon from '@components/icons/SearchIcon';
import { reaction } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useRootStore } from '@/store/RootStore/hooks';
import styles from './Filters.module.scss';
import { useRecipesPageStore } from '@/store/RecipesStore';

export const Filters = observer(() => {
  const categories = useRecipesPageStore().category;
  const rootStore = useRootStore();

  const [localQuery, setLocalQuery] = useState(rootStore.query.getParam('searchTerm') || '');
  const isInitialized = useRef(false);

  useEffect(() => {
    const dispose = reaction(
      () => rootStore.query.getParam('searchTerm'),
      (searchString) => {
        if (!isInitialized.current && searchString) {
          setLocalQuery(searchString as string);
          isInitialized.current = true;
        }
      }
    );

    return () => dispose();
  }, [rootStore.query]);

  const getTitle = useCallback((value: Option[]) => {
    return value.length > 0 ? value.map((v) => v.value).join(', ') : 'Categories';
  }, []);

  const onChangeCategories = useCallback(
    (value: Option[]) => {
      rootStore.query.category = value;
    },
    [rootStore.query]
  );

  const onSearchFilter = useCallback(() => {
    if (typeof localQuery === 'string') {
      rootStore.query.searchTerm = localQuery;
    }
  }, [localQuery, rootStore.query]);

  const onChangeVegetarian = useCallback(
    (isVegetarian: boolean) => {
      rootStore.query.vegetarian = isVegetarian;
    },
    [rootStore.query]
  );

  return (
    <div className={styles.filters}>
      <div className={styles.search}>
        <Input value={localQuery as string} onChange={setLocalQuery} id={'search'} />
        <Button onClick={onSearchFilter}>
          <SearchIcon />
        </Button>
      </div>
      <div className={styles.filtersContainer}>
        <div className={styles.leftGroup}>
          <MultiDropdown
            className={styles.dropdown}
            options={categories.list}
            value={rootStore.query.category}
            onChange={onChangeCategories}
            getTitle={getTitle}
          />
          <div className={styles.vegetarian}>
            <Text>Vegetarian:</Text>
            <CheckBox checked={rootStore.query.vegetarian} onChange={onChangeVegetarian} />
          </div>
        </div>
        <div>
          <Button onClick={rootStore.query.reset}>Reset filters</Button>
        </div>
      </div>
    </div>
  );
});
