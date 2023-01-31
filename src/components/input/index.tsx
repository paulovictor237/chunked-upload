import { Text } from "@/components/text";
import { forwardRef, useId, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { twMerge } from "tailwind-merge";
import { Props } from "./types";

export const Input = ({
  label,
  className,
  containerClassName,
  labelClassName,
  type,
  iconBefore,
  iconAfter,
  disabled,
  ...rest
}: Props) => {
  const id = useId();

  const [passwordShown, setPasswordShown] = useState(false);

  const toggle = () => setPasswordShown((prev) => !prev);

  const disabledStyle = disabled ? "bg-gray-200 pointer-events-none" : "";

  return (
    <div
      className={twMerge(
        `flex flex-col justify-center w-full`,
        containerClassName
      )}
    >
      {label && (
        <Text
          mode="label"
          htmlFor={id}
          className={twMerge("mb-4", labelClassName)}
        >
          {label}
        </Text>
      )}

      <div
        role="input-container"
        className={twMerge(
          "flex flex-row items-center justify-between space-x-2 px-4 py-2 w-full border border-gray-300 rounded-lg bg-white hover:border-blue-300 focus-within:border-blue-800",
          className,
          disabledStyle
        )}
      >
        {iconBefore}

        <input
          id={id}
          // ref={ref}
          className="bg-transparent  appearance-none h-full border-none outline-none w-full relative right-0"
          type={passwordShown ? "text" : type}
          disabled={disabled}
          {...rest}
        />

        {type === "password" && (
          <div
            role="password-button"
            className="cursor-pointer text-gray-700"
            onClick={toggle}
          >
            {!passwordShown && <FiEye role="icon-eye-open" size={20} />}
            {passwordShown && <FiEyeOff role="icon-eye-off" size={20} />}
          </div>
        )}

        {iconAfter}
      </div>
    </div>
  );
};

export type { Props as InputProps };
