'use client';
import styles from './FavoritesItem.module.scss';
import Link from 'next/link';
import HtmlContent from '@components/HtmlContent';
import Button from '@components/Button';
import { FC, useCallback, useState } from 'react';
import { routes } from '@config/routes';
import Text from '@components/Text';
import { Recipe } from '@/store/models';
import Image from 'next/image';

type FavoritesItemProps = {
  item?: Recipe;
  onRemove: (id: number) => void;
  id: number;
  isLoading?: boolean;
};

export const FavoritesItem: FC<FavoritesItemProps> = (props) => {
  const { item, onRemove, id, isLoading = false } = props;
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleToggleCollapsed = useCallback(() => {
    setIsCollapsed((prevState) => !prevState);
  }, []);

  const handleRemove = useCallback(() => {
    onRemove(id);
  }, [id, onRemove]);

  if (!item) return null;

  return (
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
          <Link href={routes.recipe.create(item.documentId)} title={'go to recipe page'}>
            <Text maxLines={2} view={'p-20'}>
              {item.name}
            </Text>
          </Link>

          <Text tag={'h3'} maxLines={isCollapsed ? 2 : undefined}>
            <HtmlContent html={item.summary} />
          </Text>
        </div>
      </div>

      <div className={styles.actions}>
        <Button loading={isLoading} onClick={handleRemove}>
          Remove
        </Button>
        <Button className={styles.collapsedButton} onClick={handleToggleCollapsed}>
          {isCollapsed ? 'read in full...' : 'collapse description'}
        </Button>
      </div>
    </li>
  );
};
