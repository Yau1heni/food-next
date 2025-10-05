import type { FC } from 'react';

import type { Option } from '../../MultiDropdown/MultiDropdown';
import Text from '../../Text';

import styles from './DropdownList.module.scss';
import { DropdownListItem } from './DropdownListItem';

type DropdownListProps = {
  open: boolean;
  disabled?: boolean;
  filteredOptions: Option[];
  onSelect: (option: Option) => void;
  selectedKeys: Set<string>;
};

export const DropdownList: FC<DropdownListProps> = (props) => {
  const { open, disabled, filteredOptions, onSelect, selectedKeys } = props;

  if (!open || disabled) return null;

  return (
    <div className={styles.dropdown}>
      {filteredOptions.length === 0 ? (
        <Text view={'p-16'}>Нет вариантов</Text>
      ) : (
        filteredOptions.map((opt) => (
          <DropdownListItem
            key={opt.key}
            option={opt}
            onSelect={onSelect}
            isSelected={selectedKeys.has(opt.key)}
          />
        ))
      )}
    </div>
  );
};
