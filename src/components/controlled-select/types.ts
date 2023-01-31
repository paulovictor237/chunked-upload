import { SelectProps } from 'app/components/select';

export type Props = SelectProps & {
  name: string;
  containerClassName?: string;
};

export type Texts = {
  placeholder: string;
};
