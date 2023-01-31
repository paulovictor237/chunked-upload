import type { ReactDatePickerProps } from 'react-datepicker';

export type Props = Partial<ReactDatePickerProps> & {
  name: string;
  labelClassName?: string;
  label?: string;
};
