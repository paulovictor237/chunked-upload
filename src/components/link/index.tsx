import NextLink from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import { twMerge } from "tailwind-merge";
import { Mode, Props } from "./types";

export const Link: FC<Props> = ({
  href,
  children,
  className,
  activeClassName,
  mode = "primary",
  disabled = false,
  ...rest
}) => {
  const { asPath } = useRouter();

  const isActive = asPath.endsWith(href);
  const disabledStyle = disabled ? "opacity-20" : "";
  const commonStyle = "flex items-center justify-center text-center font-bold";
  const modeStyle: { [key in Mode]: string } = {
    primary:
      "rounded w-full py-3 px-6 h-12 text-white bg-orange-500 hover:bg-orange-700",
    secondary:
      "rounded w-full py-3 px-6 h-12 text-orange-500 bg-transparent hover:bg-orange-100 border-2 border-orange-500",
    tertiary:
      "w-fit underline text-orange-500 hover:text-orange-700 bg-transparent",
  };

  return (
    <NextLink
      href={href}
      passHref
      className={twMerge(
        commonStyle,
        modeStyle[mode],
        disabledStyle,
        className,
        isActive && activeClassName
      )}
      {...rest}
    >
      {children}
    </NextLink>
  );
};
