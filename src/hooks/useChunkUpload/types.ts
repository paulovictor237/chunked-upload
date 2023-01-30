export type Props = {
  uploadApi: UploadApi;
  chunkSize?: number;
  onFinished?: (response: any) => void;
};

export type UploadApi = (props: {
  data: string;
  params: URLSearchParams;
}) => Promise<any>;

export type FileProps = {
  currentChunkIndex: number;
  currentFile: globalThis.File | null;
  progress: number;
  chunks: number;
  status: "finished" | "progress";
};
