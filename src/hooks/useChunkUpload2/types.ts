export type Status = "in progress" | "finished";

export type Props = {
  queryFn: QueryFn;
  onSuccess?: (response: any) => void;
  chunkSize?: number;
};

export type Data = {
  name: string;
  size: string;
  index: string;
  length: string;
  base64: string;
};

export type QueryFn = (props: {
  data: Data;
  signal: AbortSignal;
}) => Promise<any>;

export type BlobProps = { file: File; index: number; chunkSize: number };
