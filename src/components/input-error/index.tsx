import React from 'react';
import { FiXCircle } from 'react-icons/fi';
import { twMerge } from 'tailwind-merge';
import type { Props } from './types';

export const InputErrorMessage: React.FC<Props> = ({
  message,
  className,
  ...rest
}) => (
  <div
    role='contentinfo'
    className={twMerge(
      `flex items-center text-sm gap-1 text-red-600`,
      className,
    )}
    {...rest}
  >
    <FiXCircle className='min-w-fit' size='1rem' />
    <span>{message}</span>
  </div>
);
