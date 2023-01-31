import { ReactNode } from 'react';

export type Props = JSX.IntrinsicElements['input'] & {
  name: string;
  label?: string;
  children: ReactNode;
  labelClassName?: string;
  containerClassName?: string;
};
