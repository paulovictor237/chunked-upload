import { InputErrorMessage } from "@/components/input-error";
import { useFileUpload } from "@/hooks/useChunkUpload2";
import Image from "next/image";
import { FC, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import { FiXCircle } from "react-icons/fi";
import { twMerge } from "tailwind-merge";
import { Text } from "../text";
import { Props } from "./types";

export const ControlledChunkFile: FC<Props> = ({
  name,
  className,
  children,
  label,
  labelClassName,
  containerClassName,
  uploadApi,
  ...rest
}) => {
  const {
    setValue,
    formState: { errors },
  } = useFormContext();
  const [dropzoneActive, setDropzoneActive] = useState(false);
  const [fileName, setFileName] = useState("");

  const { addFile, progress, abortQuery } = useFileUpload({
    queryFn: uploadApi,
    onSuccess: (response) => setValue(name, response),
  });

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    if (files.length > 0) setFileName(files[0].name);
    addFile(files[0]);
  };

  const handleDrop = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    setDropzoneActive(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) setFileName(files[0].name);
    addFile(files[0]);
  };

  const remove = () => {
    setFileName(""), setValue(name, ""), abortQuery();
  };

  const progressColor =
    !dropzoneActive &&
    fileName !== "" &&
    (progress === 100 ? "bg-green-500" : "bg-yellow-400");

  return (
    <div
      className={twMerge(
        "flex gap-2 w-full flex-1 flex-col",
        containerClassName
      )}
    >
      {label && (
        <Text mode="label" htmlFor={name} className={labelClassName}>
          {label}
        </Text>
      )}

      <input
        className="sr-only w-0"
        id={name}
        type="file"
        multiple={false}
        accept="image/*;capture=camera"
        capture
        {...rest}
        onChange={onChange}
      />

      <label
        htmlFor={name}
        className={twMerge(
          "p-2 h-20 relative text-center rounded-md overflow-hidden cursor-pointer border-2 border-dashed",
          errors?.[name] && "border-red-600",
          dropzoneActive && "border-green-800 border-solid bg-blue-500"
        )}
        onDragOver={(e) => {
          e.preventDefault(), setDropzoneActive(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault(), setDropzoneActive(false);
        }}
        onDrop={handleDrop}
      >
        <div
          className={twMerge("h-full rounded-md", progressColor)}
          style={{ width: progress + "%" }}
        />
        <Text className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {fileName === "" ? children : progress + "%"}
        </Text>
      </label>

      {fileName && (
        <div className="flex items-center justify-between bg-blue-500 rounded-md text-center p-1">
          <Text>{fileName}</Text>
          <FiXCircle
            size={"1.5rem"}
            className="cursor-pointer hover:text-red-500"
            onClick={remove}
          />
        </div>
      )}

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
