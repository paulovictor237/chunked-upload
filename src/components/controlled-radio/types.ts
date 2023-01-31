export type Props = {
  name: string;
  uncheckValue?: string | null;
  className?: string;
  containerClassName?: string;
  items: RadioItems;
};

export type RadioItems = {
  text: string;
  value: string;
  defaultChecked?: boolean;
}[];
