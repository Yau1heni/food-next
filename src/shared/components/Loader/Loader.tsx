import cn from 'classnames';
import React from 'react';

import styles from './Loader.module.scss';

export type LoaderProps = {
  /** Размер */
  size?: 's' | 'm' | 'l';
  /** Дополнительный класс */
  className?: string;
};

const Loader: React.FC<LoaderProps> = ({ size = 'l', className }) => {
  const finallyClassName = cn(styles.loader, styles[size], className);

  return <div className={finallyClassName} data-testid="loader" />;
};

export default Loader;
