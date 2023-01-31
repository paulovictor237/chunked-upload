export type Mode = 'primary' | 'secondary' | 'tertiary';

export type Props = JSX.IntrinsicElements['button'] & {
  mode?: Mode;
};
