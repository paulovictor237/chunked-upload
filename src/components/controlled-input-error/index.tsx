import React from "react";
import { useFormContext } from "react-hook-form";
import { FiXCircle } from "react-icons/fi";
import { twMerge } from "tailwind-merge";
import type { Props } from "./types";

export const InputErrorMessage: React.FC<Props> = ({
  name,
  className,
  ...rest
}) => {
  const {
    formState: { errors },
  } = useFormContext();

  const message = errors?.[name]?.message;
  if (!message) return null;
  return (
    <div
      role="contentinfo"
      className={twMerge(
        `flex items-center text-sm gap-1 text-red-600`,
        className
      )}
      {...rest}
    >
      <FiXCircle className="min-w-fit" size="1rem" />
      <span>{String(message)}</span>
    </div>
  );
};
