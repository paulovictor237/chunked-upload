import { ReactNode } from 'react';

export type Props = JSX.IntrinsicElements['input'] & {
  name: string;
  children?: ReactNode;
  containerClassName?: string;
  classNameCheckBox?: string;
};
