import cn from 'classnames';
import React from 'react';

import Text from '../Text';

import styles from './Card.module.scss';
import Image from 'next/image';

export type CardProps = {
  /** Дополнительный classname */
  className?: string;
  /** URL изображения */
  image: string;
  /** Слот над заголовком */
  captionSlot?: React.ReactNode;
  /** Заголовок карточки */
  title: React.ReactNode;
  /** Описание карточки */
  subtitle: React.ReactNode;
  /** Содержимое карточки (футер/боковая часть), может быть пустым */
  contentSlot?: React.ReactNode;
  /** Клик на карточку */
  onClick?: React.MouseEventHandler;
  /** Слот для действия */
  actionSlot?: React.ReactNode;
};

const Card: React.FC<CardProps> = (props) => {
  const { className, image, title, subtitle, actionSlot, contentSlot, captionSlot, onClick } =
    props;

  const finallyClassName = cn(styles.card, className);

  return (
    <div onClick={onClick} className={finallyClassName}>
      <div className={styles.image}>
        <Image src={image} alt={image} width={350} height={350} />
      </div>
      <div className={styles.cardBody}>
        <div className={styles.content}>
          {captionSlot && <div className={styles.captionSlot}>{captionSlot}</div>}
          <Text weight={'bold'} view={'p-20'} maxLines={2}>
            {title}
          </Text>
          <Text className={styles.subTitle} maxLines={3}>
            {subtitle}
          </Text>
        </div>
        <div className={styles.footer}>
          <div className={styles.contentSlot}>{contentSlot}</div>
          {actionSlot}
        </div>
      </div>
    </div>
  );
};

export default Card;
