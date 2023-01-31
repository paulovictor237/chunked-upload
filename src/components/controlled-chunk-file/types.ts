import { UploadApi } from "@/hooks/useChunkUpload/types";
import { ReactNode } from "react";

export type Props = JSX.IntrinsicElements["input"] & {
  name: string;
  uploadApi: UploadApi;
  label?: string;
  children: ReactNode;
  labelClassName?: string;
  containerClassName?: string;
};
