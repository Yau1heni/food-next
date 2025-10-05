'use client';

import HtmlContent from '@components/HtmlContent';
import { FC } from 'react';

import styles from './RecipeDescription.module.scss';

type RecipeDescriptionProps = {
  description: string;
};

export const RecipeDescription: FC<RecipeDescriptionProps> = ({ description }) => {
  return (
    <div className={styles.recipeDescription}>
      <HtmlContent html={description} />
    </div>
  );
};
