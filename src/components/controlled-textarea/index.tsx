import { InputErrorMessage } from "@/components/input-error";
import { useI18N } from "@/hooks/i18n";
import { FC, useId } from "react";
import { useFormContext } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { Text } from "../text";
import { i18n } from "./i18n";
import { Props } from "./types";

export const ControlledTextArea: FC<Props> = ({
  className,
  label,
  labelClassName,
  name,
  minLength,
  ...rest
}) => {
  const {
    watch,
    register,
    formState: { errors },
  } = useFormContext();
  const texts = useI18N(i18n);
  const id = useId();

  const hasError = !!errors?.[name];

  const length = rest.maxLength || minLength;
  const counter = !!length && ((watch(name) as string)?.length ?? 0);

  const maxLengthColor = () => {
    if (!rest.maxLength) return;
    if (counter === rest.maxLength) return "text-red-500";
    if (counter > rest.maxLength * 0.95) return "text-yellow-500";
  };

  return (
    <div className="flex flex-col w-full">
      <Text
        mode="label"
        htmlFor={id}
        className={twMerge("mb-0.5", labelClassName)}
      >
        {label}
      </Text>
      <textarea
        id={id}
        className={twMerge(
          `bg-white border border-gray-300 py-1.5 px-2.5 rounded-lg resize-y text-gray-900 hover:border-blue-300 focus-within:outline-blue-900 focus:hover:border-blue-300
          ${hasError && "border-red-200"}`,
          className
        )}
        {...rest}
        {...register(name)}
      />
      {!!length && (
        <Text className="mt-1">
          {texts.characters}
          <Text mode="strong" className={` text-sm ${maxLengthColor()}`}>
            {counter} {rest.maxLength && " / " + length}
          </Text>
        </Text>
      )}

      {hasError && (
        <InputErrorMessage
          className="mt-1"
          // @ts-ignore
          message={errors[name].message as string}
        />
      )}
    </div>
  );
};
