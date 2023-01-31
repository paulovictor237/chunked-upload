import { useId } from 'react';
import { useFormContext } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import { InputErrorMessage } from '../input-error';
import { Props } from './types';

export const ControlledRadio = ({
  name,
  items,
  className,
  containerClassName,
  uncheckValue,
}: Props) => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();
  const id = useId();
  const watchedValue = watch(name);

  const error = String(errors?.[name]?.message);

  const onClick = (value: string) => {
    if (uncheckValue === undefined) return;
    if (String(watchedValue) !== String(value)) return;
    setValue(name, uncheckValue);
  };

  return (
    <>
      <div
        className={twMerge(
          'flex flex-col xl:flex-row gap-2 xl:gap-8 justify-between text-gray-800',
          containerClassName,
        )}
      >
        {items.map((item) => (
          <label
            key={item.text + item.value}
            className={twMerge(
              'flex items-center gap-1 cursor-pointer',
              className,
            )}
            htmlFor={id + item.value}
            role='controlled-radio-label'
          >
            <input
              type='radio'
              id={id + item.value}
              value={item.value}
              defaultChecked={item.defaultChecked}
              role='controlled-radio-input'
              onClick={() => onClick(item.value)}
              {...register(name)}
            />
            {item.text}
          </label>
        ))}
      </div>
      {error && <InputErrorMessage message={error} className='mt-1' />}
    </>
  );
};
