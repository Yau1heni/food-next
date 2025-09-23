import cn from 'classnames';
import React from 'react';

import styles from './Text.module.scss';

export type TextProps = {
  /** Дополнительный класс */
  className?: string;
  /** Стиль отображения */
  view?: 'title' | 'button' | 'p-20' | 'p-18' | 'p-16' | 'p-14';
  /** Html-тег */
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';
  /** Начертание шрифта */
  weight?: 'normal' | 'medium' | 'bold';
  /** Контент */
  children: React.ReactNode;
  /** Цвет */
  color?: 'primary' | 'secondary' | 'accent';
  /** Максимальное кол-во строк */
  maxLines?: number;
};

const Text: React.FC<TextProps> = (props) => {
  const {
    tag: Tag = 'p',
    color,
    maxLines,
    view = 'p-16',
    weight = 'normal',
    className,
    children,
  } = props;

  const finallyClassName = cn(
    styles.text,
    {
      [styles[`weight-${weight}`]]: weight,
      [styles[`view-${view}`]]: view,
      [styles[`color-${color}`]]: color,
    },
    styles[maxLines || 'key'],
    className
  );

  const style: React.CSSProperties = {};

  if (maxLines) {
    style.display = '-webkit-box';
    style.WebkitLineClamp = maxLines;
    style.WebkitBoxOrient = 'vertical';
    style.overflow = 'hidden';
  }

  return (
    <Tag className={finallyClassName} style={style}>
      {children}
    </Tag>
  );
};

export default Text;
