import { ChangeEvent, FC, ReactNode, useCallback, useRef } from 'react';
import cn from 'classnames';

export type InputFileProps = {
  accept?: string;
  className?: string;
  onFileSelected: (file: File) => void;
  children: (open: () => void) => ReactNode;
};

export const InputFile: FC<InputFileProps> = ({
  accept = 'image/*',
  className,
  onFileSelected,
  children,
}) => {
  const fileRef = useRef<HTMLInputElement | null>(null);

  const open = useCallback(() => fileRef.current?.click(), []);
  const handleOnChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.currentTarget.files?.[0];
      if (file) onFileSelected(file);
      e.currentTarget.value = '';
    },
    [onFileSelected]
  );

  return (
    <>
      {children(open)}
      <input
        ref={fileRef}
        type="file"
        accept={accept}
        className={cn(className)}
        onChange={handleOnChange}
        style={{ display: 'none' }}
      />
    </>
  );
};
