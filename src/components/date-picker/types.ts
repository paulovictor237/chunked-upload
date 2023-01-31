import { SyntheticEvent } from 'react';
import { ReactDatePickerProps } from 'react-datepicker';

export type Props = Partial<ReactDatePickerProps> & {
  onChange: (
    date: Date | null,
    event: SyntheticEvent<any, Event> | undefined,
  ) => void;
};

export type Texts = {
  placeholder: string;
  hour: string;
};
