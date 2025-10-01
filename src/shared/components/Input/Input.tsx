import cn from 'classnames';
import type { ChangeEvent } from 'react';
import React, { forwardRef } from 'react';

import styles from './Input.module.scss';

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> & {
  /** Значение поля */
  value: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
  /** Слот для иконки справа */
  afterSlot?: React.ReactNode;
};

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { value, onChange, afterSlot, className, ...rest } = props;

  const handleOnchange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.currentTarget.value);
  };

  return (
    <div className={cn(styles.inputContainer, className)}>
      <input
        className={cn(styles.input, value && styles.notEmpty)}
        value={value}
        ref={ref}
        onChange={handleOnchange}
        type="text"
        {...rest}
      />
      <div className={styles.afterSlot}>{afterSlot}</div>
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
