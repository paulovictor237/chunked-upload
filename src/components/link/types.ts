import { LinkProps } from "next/link";
import { ReactNode } from "react";
export type Mode = "primary" | "secondary" | "tertiary";

export type Props = LinkProps & {
  href: string;
  mode?: Mode;
  disabled?: boolean;
  activeClassName?: string;
  className?: string;
  children?: ReactNode;
};
