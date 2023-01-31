import { FC, useEffect, useId } from 'react';
import { useFormContext } from 'react-hook-form';
import { HiCheck } from 'react-icons/hi';
import { twMerge } from 'tailwind-merge';
import { InputErrorMessage } from '../input-error';
import { Text } from '../text';
import { Props } from './types';

export const ControlledCheckbox: FC<Props> = ({
  name,
  children,
  classNameCheckBox,
  disabled,
  containerClassName,
  className,
  ...rest
}) => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();
  const generatedId = useId();
  const id = rest.id || generatedId;

  const checked = rest.checked || rest.defaultChecked;
  const selected = watch(name) || checked;

  const error = String(errors?.[name]?.message);

  useEffect(() => {
    if (checked) setValue(name, true);
  }, []);

  return (
    <label
      className='flex flex-col justify-between'
      htmlFor={id}
      role='controlled-checkbox-label'
    >
      <div
        className={twMerge(
          'flex items-center',
          disabled ? 'grayscale opacity-80' : 'cursor-pointer group',
          containerClassName,
        )}
      >
        <input
          id={id}
          type='checkbox'
          disabled={disabled}
          className='hidden'
          role='controlled-checkbox-input'
          {...rest}
          {...register(name)}
        />

        <section
          className={twMerge(
            'transition duration-300 ease-in-out',
            'rounded-md h-5 w-5 flex items-center justify-center text-white flex-none',
            selected
              ? 'bg-green-500 group-hover:bg-green-400'
              : 'border-2 border-gray-500 group-hover:bg-gray-100',
            selected && disabled && 'bg-gray-200 text-gray-400',
            classNameCheckBox,
            error && 'border-red-600',
          )}
        >
          {selected && (
            <HiCheck size='2rem' role='controlled-checkbox-hicheck' />
          )}
        </section>
        <Text mode='label' className={twMerge('ml-2', className)} htmlFor={id}>
          {children}
        </Text>
      </div>
      {error && <InputErrorMessage message={error} className='mt-1' />}
    </label>
  );
};
