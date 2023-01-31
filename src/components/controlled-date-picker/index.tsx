import { DatePicker } from 'app/components/date-picker';
import { InputErrorMessage } from 'app/components/input-error';
import { Text } from 'app/components/text';
import { FC, useId } from 'react';
import { useFormContext } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import { Props } from './types';

export const ControlledDatePicker: FC<Props> = ({
  name,
  labelClassName,
  label,
  ...rest
}) => {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();
  const id = useId();

  const hasError = errors?.[name];
  const watchDate = watch(name, new Date());

  const handleChangeDate = (selectedDate: Date | null) => {
    if (selectedDate) {
      setValue(name, selectedDate);
    }
  };

  return (
    <div className='flex flex-col w-full'>
      {label && (
        <Text
          mode='label'
          htmlFor={id}
          className={twMerge('mb-4', labelClassName)}
        >
          {label}
        </Text>
      )}

      <DatePicker
        {...rest}
        id={id}
        name={name}
        selected={watchDate}
        onSelect={handleChangeDate}
        onChange={handleChangeDate}
      />

      {hasError && (
        <InputErrorMessage
          className='mt-1'
          message={String(errors[name]?.message)}
        />
      )}
    </div>
  );
};
