import { InputErrorMessage } from "@/components/input-error";
import Image from "next/image";
import { FC, useState } from "react";
import { useFormContext } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { Text } from "../text";
import { Props } from "./types";

export const ControlledInputFile: FC<Props> = ({
  name,
  className,
  children,
  label,
  labelClassName,
  containerClassName,
  ...rest
}) => {
  const [thumbnail, setThumbnail] = useState("");
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const onChangeLogo = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    if (files.length > 0) {
      setThumbnail(URL.createObjectURL(files[0]));
    }
  };

  const previewImage = () => {
    if (thumbnail != null) {
      return (
        <Image
          alt="logo"
          width="100%"
          height="100%"
          blurDataURL={thumbnail}
          placeholder="blur"
          src={thumbnail}
        />
      );
    }

    return null;
  };

  return (
    <div className={twMerge("flex w-full flex-1 flex-col", containerClassName)}>
      {label && (
        <Text
          mode="label"
          htmlFor={name}
          className={twMerge("w-fit mb-4", labelClassName)}
        >
          {label}
        </Text>
      )}
      <label
        className={twMerge(
          "flex flex-col justify-center items-center w-full h-full lg:h-[6.875rem] px-4 lg:px-7 border border-dashed",
          errors?.[name] ? "border-red-600" : "border-outline",
          className
        )}
      >
        <input
          className="sr-only w-0"
          id={name}
          type="file"
          multiple={false}
          accept="image/*;capture=camera"
          capture
          {...rest}
          {...register(name)}
          onChange={(e) => {
            onChangeLogo(e);
          }}
        />
        {thumbnail !== "" ? (
          <div className="w-full h-[6.875rem] flex items-center">
            {previewImage()}
          </div>
        ) : (
          <>{children}</>
        )}
      </label>
      {!!errors?.[name] && (
        <InputErrorMessage
          className="mt-1"
          // @ts-ignore
          message={errors[name]?.message as string}
        />
      )}
    </div>
  );
};
