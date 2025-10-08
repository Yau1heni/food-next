'use client';
import styles from './FavoritesItem.module.scss';
import Link from 'next/link';
import HtmlContent from '@components/HtmlContent';
import Button from '@components/Button';
import { FC, MouseEvent, useCallback, useState } from 'react';
import { routes } from '@config/routes';
import Text from '@components/Text';
import { Recipe } from '@/store/models';
import Image from 'next/image';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '@/store/RootStore/hooks';

type FavoritesItemProps = {
  item?: Recipe;
  onRemove: (id: number) => void;
  id: number;
};

export const FavoritesItem: FC<FavoritesItemProps> = observer((props) => {
  const { favorites } = useRootStore();
  const { item, onRemove, id } = props;
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleToggleCollapsed = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsCollapsed((prevState) => !prevState);
  }, []);

  const handleRemove = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      onRemove(id);
    },
    [id, onRemove]
  );

  if (!item) return null;

  return (
    <Link href={routes.recipe.create(item.documentId)} title={'go to recipe page'}>
      <li className={styles.favoritesItem}>
        <div className={styles.itemBody}>
          <div className={styles.image}>
            <Image
              src={item.images[0].formats.thumbnail.url}
              alt={'recipe image'}
              width={350}
              height={350}
            />
          </div>

          <div className={styles.description}>
            <Text maxLines={2} view={'p-20'}>
              {item.name}
            </Text>
            <Text tag={'h3'} maxLines={isCollapsed ? 2 : undefined}>
              <HtmlContent html={item.summary} allowLinks={false} />
            </Text>
          </div>
        </div>

        <div className={styles.actions}>
          <Button loading={favorites.loadingById[id]} onClick={handleRemove}>
            Remove
          </Button>
          <Button className={styles.collapsedButton} onClick={handleToggleCollapsed}>
            {isCollapsed ? 'read in full...' : 'collapse description'}
          </Button>
        </div>
      </li>
    </Link>
  );
});
