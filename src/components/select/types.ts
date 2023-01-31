import { ReactNode } from 'react';
import { Props as SelectProps } from 'react-select';

export type ControlledSelectOption<T> = {
  label: any;
  value: T;
};

export type Props = Omit<SelectProps, 'options' | 'onChange'> & {
  label?: string | ReactNode;
  labelClassName?: string;
  options: ControlledSelectOption<any>[];
  onChange?: (option: ControlledSelectOption<any>) => void;
};

export type Texts = {
  placeholder: string;
};
