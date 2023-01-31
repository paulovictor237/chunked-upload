import { InputErrorMessage } from "@/components/input-error";
import { useI18N } from "@/hooks/i18n";
import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { Select } from "@/components/select";
import { twMerge } from "tailwind-merge";
import { i18n } from "./i18n";
import { Props } from "./types";

export const ControlledSelect: FC<Props> = ({
  name,
  containerClassName,
  defaultValue,
  ...rest
}) => {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const texts = useI18N(i18n);
  const selectWatch = watch(name);

  const undefinedValue = {
    label: texts.placeholder,
    value: undefined,
  };

  return (
    <div className={twMerge("flex flex-col w-full", containerClassName)}>
      <Select
        {...rest}
        value={selectWatch ?? defaultValue ?? undefinedValue}
        onChange={(option) => setValue(name, option, { shouldValidate: true })}
      />

      {!!errors?.[name] && (
        <InputErrorMessage
          className="mt-1"
          // @ts-ignore
          message={errors[name]?.value?.message as string}
        />
      )}
    </div>
  );
};
