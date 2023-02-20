import { QueryFn } from "@/hooks/useChunkUpload2/types";
import { ReactNode } from "react";

export type Props = JSX.IntrinsicElements["input"] & {
  name: string;
  uploadApi: QueryFn;
  label?: string;
  children: ReactNode;
  labelClassName?: string;
  containerClassName?: string;
};
