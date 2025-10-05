import cn from 'classnames';
import React from 'react';

import Loader from '../Loader/Loader';

import styles from './Button.module.scss';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Состояние загрузки */
  loading?: boolean;
  /** Текст кнопки */
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({ loading, children, className, ...rest }) => {
  const finallyClassName = cn(styles.button, loading && styles.buttonLoading, className);

  return (
    <button className={finallyClassName} disabled={loading} {...rest}>
      {loading && <Loader className={styles.loader} size={'s'} />}
      {children}
    </button>
  );
};

export default Button;
