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
}

export const EditableField: React.FC<EditableFieldProps> = (props) => {
  const { initialValue, onSave, placeholder, inputType = 'text' } = props;

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [localValue, setLocalValue] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleEditClick = useCallback((): void => {
    setLocalValue(initialValue);
    setIsEditing(true);
  }, [initialValue]);

  const handleSave = useCallback((): void => {
    const newValue = localValue.trim();
    setIsEditing(false);

    if (onSave && newValue !== initialValue) {
      onSave(newValue);
    }
  }, [localValue, initialValue, onSave]);

  const handleCancel = useCallback((): void => {
    setLocalValue(initialValue);
    setIsEditing(false);
  }, [initialValue]);

  return (
    <div className={styles.editableField}>
      {!initialValue || isEditing ? (
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
