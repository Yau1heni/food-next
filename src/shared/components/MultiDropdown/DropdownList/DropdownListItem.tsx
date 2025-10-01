import cn from 'classnames';
import React from 'react';

import type { Option } from '../../MultiDropdown';

import styles from './DropdownList.module.scss';

type DropdownListItemProps = {
  option: Option;
  onSelect: (option: Option) => void;
  isSelected: boolean;
};

export const DropdownListItem: React.FC<DropdownListItemProps> = (props) => {
  const { option, onSelect, isSelected } = props;

  const handleOnSelect = () => {
    onSelect(option);
  };

  return (
    <div
      key={option.key}
      onClick={handleOnSelect}
      className={cn(styles.option, {
        [styles.selected]: isSelected,
      })}
    >
      {option.value}
    </div>
  );
};
