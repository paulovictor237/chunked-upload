import { Props } from "./types";
import { FC } from "react";
import { InputErrorMessage } from "@/components/input-error";
import { useFormContext } from "react-hook-form";

export const ControlledToggle: FC<Props> = ({
  name,
  checked = false,
  ...rest
}) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const hasError = !!errors?.[name];
  const checkedWatch = watch(name, checked);

  return (
    <div className="flex flex-col w-fit">
      <label className="m-0 p-0 cursor-pointer ">
        <span
          className={` not-sr-only border rounded-full  border-gray flex items-center w-12 ${
            checkedWatch
              ? "bg-green-600 justify-end"
              : "justify-start bg-gray-300"
          }`}
        >
          <span className="rounded-full border w-6 h-6 border-grey shadow-inner bg-white" />
        </span>

        <input
          className="sr-only"
          type="checkbox"
          {...rest}
          {...register(name)}
        />
      </label>

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
