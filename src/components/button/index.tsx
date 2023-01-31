import { FC } from 'react';
import { twMerge } from 'tailwind-merge';
import { Mode, Props } from './types';

export const Button: FC<Props> = ({
  children,
  className,
  mode = 'primary',
  ...rest
}) => {
  const disabledStyle = rest.disabled && 'opacity-20';
  const commonStyle = 'flex items-center justify-center text-center font-bold';
  const modeStyle: { [key in Mode]: string } = {
    primary:
      'rounded w-full py-3 px-6 h-12 text-white bg-orange-500 hover:bg-orange-700',
    secondary:
      'rounded w-full py-3 px-6 h-12 text-orange-500 bg-transparent hover:bg-orange-100 border-2 border-orange-500',
    tertiary: 'underline text-orange-500 hover:text-orange-700 bg-transparent',
  };

  return (
    <button
      className={twMerge(
        commonStyle,
        modeStyle[mode],
        disabledStyle,
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
};
