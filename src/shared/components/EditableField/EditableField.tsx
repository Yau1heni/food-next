import React, { useState, useRef, useEffect, useCallback } from 'react';
import styles from './EditableField.module.scss';
import Input from '@components/Input';
import Button from '@components/Button';
import Text from '@components/Text';

interface EditableFieldProps {
  initialValue: string;
  onSave?: (value: string) => void;
  placeholder?: string;
  inputType?: string;
  isEdit?: boolean;
  setEditMode: (value: string) => void;
  removeEdit: (value: string) => void;
  name: string;
}

export const EditableField: React.FC<EditableFieldProps> = (props) => {
  const {
    initialValue,
    onSave,
    placeholder,
    inputType = 'text',
    isEdit,
    removeEdit,
    setEditMode,
    name,
  } = props;

  const [localValue, setLocalValue] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEdit && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEdit]);

  const handleEditClick = useCallback((): void => {
    setLocalValue(initialValue);
    setEditMode(name);
  }, [initialValue, name, setEditMode]);

  const handleSave = useCallback((): void => {
    const newValue = localValue.trim();
    removeEdit(name);

    if (onSave && newValue !== initialValue) {
      onSave(newValue);
    }
  }, [initialValue, localValue, name, onSave, removeEdit]);

  const handleCancel = useCallback((): void => {
    setLocalValue(initialValue);
    removeEdit(name);
  }, [initialValue, name, removeEdit]);

  return (
    <div className={styles.editableField}>
      {!initialValue || isEdit ? (
        <div className={styles.editContainer}>
          <Input
            ref={inputRef}
            type={inputType}
            value={localValue}
            onChange={setLocalValue}
            placeholder={placeholder}
            className={styles.input}
          />
          <div className={styles.actions}>
            <Button onClick={handleSave}>Save</Button>
            <Button onClick={handleCancel}>Cancel</Button>
          </div>
        </div>
      ) : (
        <div className={styles.editMode}>
          <Text view={'p-20'}>{initialValue}</Text>
          <Button onClick={handleEditClick}>Edit</Button>
        </div>
      )}
    </div>
  );
};
