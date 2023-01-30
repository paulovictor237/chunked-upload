import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FileProps, Props } from "./types";

const KB = 1024; //bytes

export const useChunkUpload = ({
  chunkSize = 10 * KB,
  uploadApi,
  onFinished,
}: Props) => {
  const initialState: FileProps = {
    currentFile: null,
    currentChunkIndex: -1,
    chunks: -1,
    progress: 100,
    status: "finished",
  };
  const [file, setFile] = useState<FileProps>(initialState);
  const { mutateAsync } = useMutation(uploadApi);
  const { currentChunkIndex, currentFile, chunks } = file;

  const readAndUploadCurrentChunk = () => {
    if (!currentFile) return;
    const from = currentChunkIndex * chunkSize;
    const to = from + chunkSize;
    const blob = currentFile.slice(from, to);
    const reader = new FileReader();
    reader.onload = (e) => uploadChunk(e);
    reader.readAsDataURL(blob);
  };

  const uploadChunk = async (readerEvent: ProgressEvent<FileReader>) => {
    if (!currentFile) return;
    const data = readerEvent.target?.result;
    const params = new URLSearchParams();
    params.set("name", currentFile.name);
    params.set("size", currentFile.size.toString());
    params.set("currentChunkIndex", currentChunkIndex.toString());
    params.set("totalChunks", chunks.toString());
    try {
      const response = await mutateAsync({ data: data as string, params });
      const isFinished = currentChunkIndex === chunks - 1;
      if (isFinished) {
        setFile(initialState);
        onFinished?.(response);
      } else {
        setFile((p) => ({
          ...p,
          progress: +(((currentChunkIndex + 1) / chunks) * 100).toFixed(2),
          currentChunkIndex: p.currentChunkIndex + 1,
        }));
      }
      return response;
    } catch (error) {
      return error;
    }
  };

  const addFile = (currentFile: globalThis.File) => {
    setFile({
      currentFile,
      chunks: Math.ceil(currentFile.size / chunkSize),
      currentChunkIndex: 0,
      progress: 0,
      status: "progress",
    });
  };

  useEffect(() => {
    readAndUploadCurrentChunk();
  }, [currentChunkIndex]);

  return { ...file, addFile };
};
