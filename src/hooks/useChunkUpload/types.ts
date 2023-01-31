export type Props = {
  uploadApi: UploadApi;
  chunkSize?: number;
  onSuccess?: (response: any) => void;
  onAbort?: (fileName: string) => void;
};

export type FileProps = {
  currentChunkIndex: number;
  currentFile: globalThis.File | null;
  progress: number;
  chunks: number;
  status: "finished" | "progress";
};

export type UploadApiParms = {
  name: string;
  size: string;
  index: string;
  total: string;
  file: string;
};

export type UploadApi = (data: UploadApiParms) => Promise<any>;
