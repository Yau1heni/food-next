import cn from 'classnames';
import Image from 'next/image';
import Text from '@components/Text';
import styles from './Avatar.module.scss';
import { CSSProperties, FC } from 'react';

export type AvatarProps = {
  src?: string;
  size?: number;
  alt?: string;
  className?: string;
  imageClassName?: string;
  fallbackText?: string;
};

export const Avatar: FC<AvatarProps> = ({
  src,
  size = 96,
  alt = 'avatar',
  className,
  imageClassName,
  fallbackText = 'No avatar',
}) => {
  const containerStyle: CSSProperties = { width: size, height: size };

  return (
    <div className={cn(styles.container, className)} style={containerStyle}>
      {src ? (
        <Image
          src={src}
          width={size}
          height={size}
          alt={alt}
          className={cn(styles.image, imageClassName)}
        />
      ) : (
        <Text tag={'h2'} view="p-16" color="secondary">
          {fallbackText}
        </Text>
      )}
    </div>
  );
};
