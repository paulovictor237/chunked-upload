import { FC, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import { Input } from '../input';
import { InputErrorMessage } from '../input-error';
import { Props } from './types';

export const ControlledInput: FC<Props> = ({
  name,
  formater = (text: string) => text,
  className,
  controlledClassName,
  registerOptions,
  ...rest
}) => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const watcher = watch(name);
  useEffect(() => {
    setValue(name, formater(watcher || ''));
  }, [watcher]);

  const error = errors?.[name]?.message && String(errors?.[name]?.message);

  return (
    <div
      className={twMerge(
        `flex flex-col justify-center w-full`,
        controlledClassName,
      )}
    >
      <Input
        className={twMerge(
          error ? 'border-red-600' : ' border-outline',
          className,
        )}
        {...rest}
        {...register(name, registerOptions)}
      />
      {error && <InputErrorMessage message={error} className='mt-1' />}
    </div>
  );
};
