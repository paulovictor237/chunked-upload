export type Props = JSX.IntrinsicElements['textarea'] & {
  name: string;
  label?: string;
  labelClassName?: string;
};

export type Texts = {
  characters: string;
};
