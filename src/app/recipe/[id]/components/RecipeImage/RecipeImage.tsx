import { FC } from 'react';
import Image from 'next/image';

import styles from './RecipeImage.module.scss';

type RecipeImageProps = {
  src: string;
  alt: string;
};

export const RecipeImage: FC<RecipeImageProps> = ({ src, alt }) => {
  return (
    <div className={styles.recipeImage}>
      <Image src={src} alt={alt} className={styles.image} width={448} height={300} />
    </div>
  );
};
